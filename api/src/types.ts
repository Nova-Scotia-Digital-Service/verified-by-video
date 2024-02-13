export interface Session {
  id: string
  prompts: Prompt[]
}

interface Prompt {
  id: string
  text: string
}

export interface Submission {
  id: string
  video_url: string
  session: Session
}

export type SubmissionConfirm = Pick<Submission, 'id' | 'video_url'>
