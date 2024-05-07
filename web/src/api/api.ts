import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { store } from '../store/configureStore'
import { stringsToDates } from '../utils/stringsToDates'

export const backendUrl = process.env.REACT_APP_HOST_BACKEND ?? 'http://localhost:3100'
const apiBaseUrl = backendUrl + '/api/v1/staff'

const coerceDates = (response: AxiosResponse) => {
  if (response.data && typeof response.data === 'object') {
    stringsToDates(response.data)
  }
  return response
}

const setAuthHeader = (config: InternalAxiosRequestConfig) => {
  const { auth } = store.getState()
  if (auth.token) {
    config.headers['Authorization'] = `Bearer ${auth.token}`
  }
  return config
}

export const api = axios.create({ baseURL: apiBaseUrl })
api.interceptors.response.use(coerceDates)
api.interceptors.request.use(setAuthHeader)
