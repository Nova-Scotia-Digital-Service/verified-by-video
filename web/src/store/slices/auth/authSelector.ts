import type { RootState } from '../../configureStore'

import { useSelector } from 'react-redux'

export const useIsAuthenticated = () => useSelector((state: RootState) => state.auth.isAuthenticated)
