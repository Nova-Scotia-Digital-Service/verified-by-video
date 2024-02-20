import { Prompt } from '../../shared/types'

export type * from '../../shared/types'

export interface Session {
  version: '1'
  id: string
  createdAt: Date
  expiresAt: Date
  prompts: Prompt[]
}

export interface Submission {
  id: string
  video_url: string
  session: Session
}

export type SubmissionConfirm = Pick<Submission, 'id' | 'video_url'>
