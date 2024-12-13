export type * from '../../../shared/types'

export type CredentialAttribute = {
  name: string
  value: string
}

export type CredentialPreview = {
  '@type': string
  attributes: [
    CredentialAttribute & { name: 'family_name' },
    CredentialAttribute & { name: 'given_names' },
    CredentialAttribute & { name: 'birthdate_dateint' },
    CredentialAttribute & { name: 'street_address' },
    CredentialAttribute & { name: 'locality' },
    CredentialAttribute & { name: 'region' },
    CredentialAttribute & { name: 'postal_code' },
    CredentialAttribute & { name: 'country' },
    CredentialAttribute & { name: 'expiry_date_dateint' },
    ...(CredentialAttribute & { name: 'picture' })[], // Optional
  ]
}

export type PersonCredential = {
  connection_id: string
  auto_issue: boolean
  auto_remove: boolean
  trace: boolean
  cred_def_id: string
  credential_preview: CredentialPreview
  comment: string
}

export type DrpcSessionRequest = {
  id: number
  jsonrpc: string
  connection_id: string
  thread_id: string
  request: {
    request: {
      method: string
    }
  }
}

export type DrpcResponse = {
  id: number
  jsonrpc: string
  result: any
}

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
