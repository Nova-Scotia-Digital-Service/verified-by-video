export type * from './shared'

export type STATUS = APIResponse<any>['status']

export type APIResponse<T> =
  | {
      status: 'LOADING'
    }
  | {
      status: 'ERROR'
      error?: unknown
    }
  | {
      status: 'READY'
      data: T
    }
