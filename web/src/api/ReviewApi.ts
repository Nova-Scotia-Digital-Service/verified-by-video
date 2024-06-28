import * as TD from '../types'

import { api } from './api'

export const getReviewList = () => {
  return api.get<TD.ReviewList>('/reviews')
}

export const getReviewDetail = (reviewId: string) => {
  return api.get<TD.Review>(`/reviews/${reviewId}`)
}

export const postReviewAnswers = (reviewId: string, data: { [question: string]: string }) => {
  return api.post(`/reviews/${reviewId}`, data)
}

export const getTagList = () => {
  return api.get<TD.Tag[]>('/tags')
}

export const applyReviewTag = (reviewId: string, tagId: string) => {
  return api.post(`/reviews/${reviewId}/tag`, { tag_id: tagId })
}

export const removeReviewTag = (reviewId: string, tagText: string) => {
  return api.delete(`/reviews/${reviewId}/tag/${tagText}`)
}
