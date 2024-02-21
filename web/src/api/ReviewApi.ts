import * as TD from '../types'

import { api } from './api'

export const getReviews = () => {
  return api.get<TD.VideoData[]>('/reviews')
}

export const getReviewQuestions = (reviewId: string) => {
  return api.get<TD.VideoReview>(`/reviews/${reviewId}`)
}
