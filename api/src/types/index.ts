export type * from '../../../shared/types'

export type DecodedKeycloakToken = {
  sub: string
  email: string
  name: string
  realm_access: {
    roles: ('reviewer' | 'admin')[]
  }
}

export type DBReviewer = {
  id: string
  email: string
  full_name: string
  is_admin: boolean
}

export type Submitter = {
  firstName: string
  lastName: string
  driversLicenseNumber: string
  birthdate: string
}
