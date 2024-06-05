export type ReviewStatus = 'PENDING' | 'APPROVED' | 'DENIED'

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

export type IdentificationCard = {
  id: string
  description: string
  date?: Date
  photo_url?: string
}

export type Review = {
  id: string
  status: ReviewStatus
  submission: Submission
  prompts: Prompt[]
  identification_cards: IdentificationCard[]
  questions: ReviewQuestion[]
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

export type LoginResponse = {
  token: string
}
