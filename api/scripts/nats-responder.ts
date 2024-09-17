import { connect } from 'nats'
import { faker } from '@faker-js/faker'

import config from '../src/config'

export const natsResponder = async () => {
  const nc = await connect({
    servers: [config.NATS_ADDRESS],
  })

  // const sub =
  nc.subscribe('vbv.identity.from_drivers_license', {
    callback: (err, msg) => {
      if (err) {
        console.log('subscription error', err.message)
        return
      }

      const payload = msg.json<{ licenseNumber: string }>()

      console.log('received NATS request:', payload)

      const { licenseNumber } = payload

      const mockSubmitter = {
        driversLicenseNumber: licenseNumber,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthdate: faker.date.birthdate().toISOString().split('T')[0],
      }

      msg.respond(JSON.stringify(mockSubmitter))
    },
  })

  // sub.unsubscribe()
  // await nc.drain()
}

natsResponder()
