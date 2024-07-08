import * as TD from '../types'

import { api } from './api'

export const postLogin = (data: { email: string; password: string }) => {
  return api.post<TD.LoginResponse>('/auth/login', data)
}
