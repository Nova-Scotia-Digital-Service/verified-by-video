import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { apiBaseUrl } from '../config'

import { store } from '../store/configureStore'
import { logout } from '../store/slices/auth/authThunks'

import { stringsToDates } from '../utils/stringsToDates'

const coerceDates = (response: AxiosResponse) => {
  if (response.data && typeof response.data === 'object') {
    stringsToDates(response.data)
  }
  return response
}

const logoutOn401Unauthorized = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    store.dispatch(logout())
  }
  return Promise.reject(error)
}

const setAuthHeader = (config: InternalAxiosRequestConfig) => {
  const { auth } = store.getState()
  if (auth.token) {
    config.headers['Authorization'] = `Bearer ${auth.token}`
  }
  return config
}

export const api = axios.create({ baseURL: apiBaseUrl })
api.interceptors.response.use(coerceDates, logoutOn401Unauthorized)
api.interceptors.request.use(setAuthHeader)
