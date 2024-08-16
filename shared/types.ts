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
  reviews: {
    id: string
    status: ReviewStatus
    created_at: Date
    reviewer_name: string
  }[]
  status: SubmissionStatus
}

export type IdentificationCard = {
  id: string
  session_id: string
  description: string
  photo_url?: string
  upload_date?: Date
}

export type Reviewer = {
  id: string
  email: string
  full_name: string
  is_admin: boolean
}

export type Review = {
  id: string
  status: ReviewStatus
  submission: Submission
  tags: Tag['text'][]
  prompts: Prompt[]
  identification_cards: IdentificationCard[]
  questions: ReviewQuestion[]
  reviewer: Reviewer | null
}

export type ReviewSummary = Omit<Review, 'prompts' | 'identification_cards' | 'questions'>
export type ReviewList = ReviewSummary[]

export type ReviewQuestion = {
  id: string
  question: string
  options: {
    id: string
    text: string
  }[]
}

export type Tag = {
  id: string
  text: string
}
