import { combineReducers } from 'redux'

import { authReducer } from './auth/authSlice'
import { tagReducer } from './tag/tagSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  tags: tagReducer,
})

export default rootReducer
