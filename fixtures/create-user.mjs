import KcAdminClient from '@keycloak/keycloak-admin-client'
import { configDotenv } from 'dotenv'

configDotenv()

const baseUrl = 'http://localhost:8080'
const realm = 'verified_by_video'

const config = {
  adminClient: {
    baseUrl: baseUrl,
    realmName: 'master',
    username: process.env.KEYCLOAK_ADMIN,
    password: process.env.KEYCLOAK_ADMIN_PASSWORD,
    grantType: 'password',
    clientId: 'admin-cli',
  },
}

if (process.argv.length < 4 || process.argv.length > 5) {
  console.log('Usage:')
  console.log('\tyarn create-user EMAIL PASSWORD [ADMIN]')
  process.exit(1)
}
const [, , email, password, isAdminInput] = process.argv

const isAdmin = isAdminInput?.toLowerCase().startsWith('t')

const realmRoles = isAdmin ? ['user', 'reviewer', 'admin'] : ['user', 'reviewer']
const clientRoles = isAdmin
  ? { 'realm-management': ['realm-admin'], account: ['manage-account'] }
  : {
      account: ['manage-account'],
    }

const adminClient = new KcAdminClient(config.adminClient)

await adminClient.auth(config.adminClient)

try {
  await adminClient.realms.partialImport({
    realm,
    rep: {
      ifResourceExists: 'FAIL',
      users: [
        {
          email,
          username: email,
          enabled: true,
          credentials: [{ type: 'password', value: password }],
          realmRoles,
          clientRoles,
        },
      ],
    },
  })
} catch (error) {
  console.error(error)
  console.log('\nERROR: Unable to create user. Check if user already exists.\n')
}
