import type { AxiosResponse } from 'axios'

import { apiCall } from './apiCall'

export const getEchoString = (some_string: string): Promise<AxiosResponse> => {
  return apiCall.get(`/echo/${some_string}`)
}
