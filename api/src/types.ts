export type * from '../../shared/types'

export interface DBSession {
  id: string
  created_at: Date
  expires_at: Date
}
