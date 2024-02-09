import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

interface DemoState {}

const initialState: DemoState = {}

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    noop: (state, action: PayloadAction<{}>) => {},
  },
})

export const { noop } = demoSlice.actions

export default demoSlice.reducer
