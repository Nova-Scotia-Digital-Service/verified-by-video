import { Link, useNavigate } from 'react-router-dom'

import { paths } from '../paths'
import { keycloak, useUserIsAdmin } from '../utils/keycloak'

import { Separator } from './Separator'

export const GlobalHeader = () => {
  const navigate = useNavigate()
  const userIsAdmin = useUserIsAdmin()

  const handleLogout = () => {
    keycloak.logout()
    navigate(paths.home({}))
  }

  return (
    <div className="flex justify-between items-center h-12 px-8 w-full bg-header-background text-header-text">
      <Link to={paths.home({})}>Home</Link>
      <div className="flex gap-4 items-center h-4">
        {userIsAdmin && (
          <>
            <Link to={paths.reviewHistory({})}>Review History</Link>
            <Separator orientation="vertical" />
            <Link to={paths.tagAdmin({})}>Admin</Link>
            <Separator orientation="vertical" />
          </>
        )}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
