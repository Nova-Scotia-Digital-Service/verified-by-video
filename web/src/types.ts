export interface ReviewQuestion {
  id: string
  question: string
  options: string[]
}

export type ReviewStatus = 'Unreviewed' | 'Approved' | 'Denied'

export interface VideoData {
  id: string
  upload_date: Date
  status: ReviewStatus
}
