export type ReviewStatus = 'Unreviewed' | 'Approved' | 'Denied'

export interface Prompt {
  id: string
  text: string
  type: 'text'
}

export interface Session {
  version: '1'
  id: string
  created_at: Date
  expires_at: Date
  prompts: Prompt[]
}

export interface Submission {
  id: string
  video_url: string
  upload_date: Date
  session_id: string
}

export interface IdentificationCard {
  id: string
  description: string
  date?: Date
  photo_url?: string
}

export interface Review {
  id: string
  status: ReviewStatus
  submission: Submission
  prompts: Prompt[]
  identification_cards: IdentificationCard[]
  questions: ReviewQuestion[]
}

export type ReviewSummary = Omit<Review, 'prompts' | 'identification_cards' | 'questions'>
export type ReviewList = ReviewSummary[]

export interface ReviewQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
  }[]
}

export interface LoginResponse {
  token: string
}
