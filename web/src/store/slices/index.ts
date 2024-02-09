import { combineReducers } from 'redux'

import demoSlice from './demo/demoSlice'

export const VERSION = 4

const rootReducer = combineReducers({
  demo: demoSlice,
})

export default rootReducer
