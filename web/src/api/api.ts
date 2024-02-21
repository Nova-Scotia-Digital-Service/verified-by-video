import axios, { AxiosResponse } from 'axios'

import { stringsToDates } from '../utils/stringsToDates'

const baseUrl = (process.env.REACT_APP_HOST_BACKEND ?? 'http://localhost:3100') + '/api/v1/staff'

const coerceDates = (response: AxiosResponse) => {
  if (response.data && typeof response.data === 'object') {
    stringsToDates(response.data)
  }
  return response
}

export const api = axios.create({ baseURL: baseUrl })
api.interceptors.response.use(coerceDates)
