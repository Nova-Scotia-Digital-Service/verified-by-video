import { Link } from 'react-router-dom'

import { useAppDispatch } from '../hooks/hooks'
import { paths } from '../paths'
import { useIsAuthenticated } from '../store/slices/auth/authSelector'
import { logout } from '../store/slices/auth/authSlice'

export const GlobalHeader = () => {
  const isAuthenticated = useIsAuthenticated()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="flex justify-between items-center h-12 px-8 w-full bg-header-background text-header-text">
      <Link to={paths.home({})}>Home</Link>
      {isAuthenticated && (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  )
}
