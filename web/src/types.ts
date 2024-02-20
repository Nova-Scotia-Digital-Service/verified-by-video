export type * from '../../shared/types'

export type STATUS = APIResponse<any>['status']

export type APIResponse<T> =
  | {
      status: 'LOADING'
    }
  | {
      status: 'ERROR'
      error?: Error | Response
    }
  | {
      status: 'READY'
      data: T
    }

export interface AuthState {
  isAuthenticated: boolean
}
