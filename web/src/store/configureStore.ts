import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { tagReducer } from './slices/tag/tagSlice'

const rootReducer = combineReducers({
  tags: tagReducer,
})

export const store = configureStore({
  reducer: ((state, action) => {
    // clear entire store on logout
    if (action.type === 'CLEAR') {
      return undefined
    }

    return rootReducer(state, action)
  }) as typeof rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
