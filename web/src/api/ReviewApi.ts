import * as TD from '../types'

import { api } from './api'

export const getReviewList = () => {
  return api.get<TD.ReviewSummary[]>('/reviews')
}

export const getReviewDetail = (reviewId: string) => {
  return api.get<TD.Review>(`/reviews/${reviewId}`)
}

export const postReviewAnswers = (
  reviewId: string,
  data: { status: TD.ReviewStatus; answers: { [question: string]: string } },
) => {
  return api.post(`/reviews/${reviewId}`, data)
}
