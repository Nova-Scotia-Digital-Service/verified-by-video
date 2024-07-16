import type * as TD from './shared'
export type * from './shared'

export type DecodedKeycloakToken = {
  sub: string
  email: string
  name: string
  realm_access: {
    roles: ('reviewer' | 'admin')[]
  }
}

export type DBUser = {
  id: string
  email: string
  full_name: string
  is_admin: boolean
}

export type DBSession = {
  id: string
  created_at: Date
  expires_at: Date
}

export type DBPrompt = {
  id: string
  session_id: string
  text: string
}

export type DBSubmission = {
  id: string
  session_id: string
  video_url: string
  upload_date: Date
}

export type DBIdentificationCard = {
  id: string
  session_id: string
  description: string
  photo_url?: string
  upload_date?: Date
}

export type DBReview = {
  id: string
  submission_id: string
  status: TD.ReviewStatus
}

export type DBReviewSummary = Pick<
  DBReview & DBSubmission,
  'id' | 'status' | 'video_url' | 'upload_date' | 'session_id'
> & {
  submission_id: DBSubmission['id']
  tags: DBTag['text'][]
  reviewer: DBUser
}

export type DBTag = {
  id: string
  text: string
}
