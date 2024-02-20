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

export interface AuthState {
  isAuthenticated: boolean
}
