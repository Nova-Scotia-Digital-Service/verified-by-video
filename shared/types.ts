export type ReviewStatus = 'STARTED' | 'ESCALATED' | 'APPROVED' | 'REJECTED'
export type SubmissionStatus = 'NEW' | 'UNDER_REVIEW' | 'ESCALATED' | 'APPROVED' | 'REJECTED'

export type Prompt = {
  id: string
  text: string
  type: 'text'
}

export type Session = {
  version: '1'
  id: string
  created_at: Date
  expires_at: Date
  prompts: Prompt[]
}

export type Submission = {
  id: string
  video_url: string
  upload_date: Date
  session_id: string
}

export type APISubmissionSummary = {
  id: string
  upload_date: Date
  tags: Tag[]
  reviews: {
    id: string
    status: ReviewStatus
    created_at: Date
    reviewer_name: string
  }[]
  status: SubmissionStatus
}

export type APICreateReviewRequest = {
  submission_id: string
}

export type APICreateReviewResponse = {
  id: string
}

export type APIFinishReviewRequest = {
  status: Exclude<ReviewStatus, 'STARTED'>
  answers: { [question: string]: string }
  comment?: string
}

export type IdentificationCard = {
  id: string
  session_id: string
  description: string
  photo_url?: string
  upload_date?: Date
}

export type Review = {
  id: string
  status: ReviewStatus
  submission: {
    id: string
    video_url: string
    upload_date: Date
    session_id: string
    tags: Tag[]
  }
  prompts: Prompt[]
  identification_cards: IdentificationCard[]
  questions: ReviewQuestion[]
}

export type ReviewQuestion = {
  id: string
  question: string
  options: {
    id: string
    text: string
    selected: boolean
    valid: boolean
  }[]
}

export type Tag = {
  id: string
  text: string
}
