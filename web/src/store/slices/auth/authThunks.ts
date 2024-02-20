import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthState } from '../../../types'

import { saveAuthData } from '../../../utils/localStorage'

export const login = createAsyncThunk('auth/login', async () => {
  const authData: AuthState = { isAuthenticated: true }
  saveAuthData(authData)
  return authData
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const authData: AuthState = { isAuthenticated: false }
  saveAuthData(authData)
  return authData
})
