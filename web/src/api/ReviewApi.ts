import * as TD from '../types'

import { api } from './api'

export const createReview = (submissionId: string) => {
  return api.post<TD.APICreateReviewResponse>('/reviews', { submission_id: submissionId } as TD.APICreateReviewRequest)
}

export const getReviewDetail = (reviewId: string) => {
  return api.get<TD.Review>(`/reviews/${reviewId}`)
}

export const finishReview = (reviewId: string, data: TD.APIFinishReviewRequest) => {
  return api.post(`/reviews/${reviewId}`, data)
}
