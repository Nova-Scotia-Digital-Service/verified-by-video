import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthState } from '../../../types'

import { saveAuthData } from '../../../utils/localStorage'

export const login = createAsyncThunk('auth/login', async (token: string) => {
  const authData: AuthState = { token: token }
  saveAuthData(authData)
  return authData
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const authData: AuthState = { token: null }
  saveAuthData(authData)
  return authData
})
