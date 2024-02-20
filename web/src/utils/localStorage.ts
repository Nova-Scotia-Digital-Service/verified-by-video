import { AuthState } from '../types'

export const loadAuthData = () => {
  try {
    const data = localStorage.getItem('authData')
    return !data ? { isAuthenticated: false } : (JSON.parse(data) as AuthState)
  } catch (err) {
    return { isAuthenticated: false }
  }
}

export const saveAuthData = (authData: AuthState) => {
  try {
    localStorage.setItem('authData', JSON.stringify(authData))
  } catch (err) {
    // noop
  }
}
