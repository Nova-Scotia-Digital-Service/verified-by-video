import * as TD from '../types'

import { connect } from 'nats'

import config from '../config'

export const getSubmitterIdentity: (licenseNumber: string) => Promise<TD.Submitter> = async (licenseNumber: string) => {
  const nc = await connect({
    servers: [config.NATS_ADDRESS],
  })

  const response = await nc.request(
    'vbv.identity.from_drivers_license',
    JSON.stringify({
      licenseNumber: licenseNumber,
    }),
  )

  nc.drain()

  const identity = await response.json<{
    driversLicenseNumber: string
    firstName: string
    lastName: string
    birthdate: string
    street_address: string
    locality: string
    region: string
    postal_code: string
    country: string
    expiry_date_dateint: string
    picture: string
  }>()

  return identity
}
