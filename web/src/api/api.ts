import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { API_BASE_URL } from '../config'

import { stringsToDates } from '../utils/stringsToDates'
import { keycloak } from '../utils/keycloak'

const coerceDates = (response: AxiosResponse) => {
  if (response.data && typeof response.data === 'object') {
    stringsToDates(response.data)
  }
  return response
}

const logoutOn401Unauthorized = (error: unknown) => {
  // if (axios.isAxiosError(error) && error.response?.status === 401) {
  //   store.dispatch(logout())
  // }
  return Promise.reject(error)
}

const setAuthHeader = (config: InternalAxiosRequestConfig) => {
  if (keycloak.token) {
    config.headers['Authorization'] = `Bearer ${keycloak.token}`
  }
  return config
}

export const api = axios.create({ baseURL: API_BASE_URL })
api.interceptors.response.use(coerceDates, logoutOn401Unauthorized)
api.interceptors.request.use(setAuthHeader)
