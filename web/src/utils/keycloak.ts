import Keycloak from 'keycloak-js'

import * as config from '../config'

export const keycloak = new Keycloak({
  url: config.KEYCLOAK_ADDRESS,
  realm: config.KEYCLOAK_REALM,
  clientId: config.KEYCLOAK_CLIENT_ID,
})

keycloak.onTokenExpired = () => keycloak.updateToken()

export const checkKeycloak = async () => {
  await keycloak.init({
    onLoad: 'login-required',
    enableLogging: process.env.NODE_ENV === 'development',
  })
}
