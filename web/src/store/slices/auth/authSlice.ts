import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: () => {
      return { isAuthenticated: true }
    },
    logout: () => {
      return { isAuthenticated: false }
    },
  },
})

export const { login, logout } = authSlice.actions

export const authReducer = authSlice.reducer
