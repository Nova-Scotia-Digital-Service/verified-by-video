import Keycloak from 'keycloak-js'
import { useEffect, useReducer } from 'react'

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

let callbacks: Function[] = []

export const useUserIsAdmin = () => {
  const [, forceRender] = useReducer((s) => s + 1, 0)

  useEffect(() => {
    const callback = () => {
      // @ts-ignore
      forceRender({})
    }
    callbacks.push(callback)

    return () => {
      callbacks = callbacks.filter((cb) => cb !== callback)
    }
  })

  return keycloak.realmAccess?.roles.includes('admin') || false
}

keycloak.onReady = () => callbacks.forEach((callback) => callback())
keycloak.onActionUpdate = () => callbacks.forEach((callback) => callback())
keycloak.onAuthError = () => callbacks.forEach((callback) => callback())
keycloak.onAuthLogout = () => callbacks.forEach((callback) => callback())
keycloak.onAuthRefreshError = () => callbacks.forEach((callback) => callback())
keycloak.onAuthSuccess = () => callbacks.forEach((callback) => callback())
