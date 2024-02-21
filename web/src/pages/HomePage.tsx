import { Navigate } from 'react-router'

import { paths } from '../paths'
import { useIsAuthenticated } from '../store/slices/auth/authSelectors'

export const HomePage = () => {
  const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? <Navigate replace to={paths.reviewList({})} /> : <Navigate replace to={paths.login({})} />
}
