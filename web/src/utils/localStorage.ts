import { AuthState } from '../types'

export const loadAuthData = () => {
  try {
    const data = localStorage.getItem('authData')
    return !data ? { token: null } : (JSON.parse(data) as AuthState)
  } catch (err) {
    return { token: null }
  }
}

export const saveAuthData = (authData: AuthState) => {
  try {
    localStorage.setItem('authData', JSON.stringify(authData))
  } catch (err) {
    // noop
  }
}
