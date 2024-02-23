import * as TD from '../types'

import { api } from './api'

export const postLogin = () => {
  return api.post<TD.LoginResponse>('/auth/login')
}
