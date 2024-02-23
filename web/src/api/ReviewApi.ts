import * as TD from '../types'

import { api } from './api'

export const getReviewList = () => {
  return api.get<TD.ReviewList>('/reviews')
}

export const getReviewDetail = (reviewId: string) => {
  return api.get<TD.Review>(`/reviews/${reviewId}`)
}
