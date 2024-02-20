import { createSlice } from '@reduxjs/toolkit'

import { loadAuthData } from '../../../utils/localStorage'

import { login, logout } from './authThunks'

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        return action.payload
      })
  },
})

export const authReducer = authSlice.reducer
