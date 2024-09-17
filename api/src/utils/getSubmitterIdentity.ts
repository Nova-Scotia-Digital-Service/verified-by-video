import * as TD from '../types'

import { connect } from 'nats'
import { faker } from '@faker-js/faker'

import config from '../config'

export const getSubmitterIdentity: () => Promise<TD.Submitter> = async () => {
  const nc = await connect({
    servers: [config.NATS_ADDRESS],
  })

  const response = await nc.request(
    'vbv.identity.from_drivers_license',
    JSON.stringify({
      licenseNumber: faker.string.numeric(14),
    }),
  )

  nc.drain()

  const identity = await response.json<{
    driversLicenseNumber: string
    firstName: string
    lastName: string
    birthdate: string
  }>()

  return identity
}
