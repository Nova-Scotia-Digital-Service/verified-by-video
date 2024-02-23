export interface IdentificationCard {
  id: string
  description: string
  date?: Date
  photo?: boolean
}

export interface VideoReview {
  id: string
  video: { id: string; prompts: Prompt[]; upload_date: Date }
  identification_cards: IdentificationCard[]
  questions: ReviewQuestion[]
}

export interface Prompt {
  id: string
  text: string
  type: 'text'
}

export interface ReviewQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
  }[]
}

export type ReviewStatus = 'Unreviewed' | 'Approved' | 'Denied'

export interface VideoData {
  id: string
  upload_date: Date
  status: ReviewStatus
}

export interface LoginResponse {
  token: string
}
