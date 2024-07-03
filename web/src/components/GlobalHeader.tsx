import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../hooks/hooks'
import { paths } from '../paths'
import { useIsAuthenticated } from '../store/slices/auth/authSelectors'
import { logout } from '../store/slices/auth/authThunks'

import { Separator } from './Separator'

export const GlobalHeader = () => {
  const isAuthenticated = useIsAuthenticated()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate(paths.home({}))
    })
  }

  return (
    <div className="flex justify-between items-center h-12 px-8 w-full bg-header-background text-header-text">
      <Link to={paths.home({})}>Home</Link>
      {isAuthenticated && (
        <div className="flex gap-4 items-center h-4">
          <Link to={paths.tagAdmin({})}>Admin</Link>
          <Separator orientation="vertical" />
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
