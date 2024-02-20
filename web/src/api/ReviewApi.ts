import * as TD from '../types'

import { api } from './api'

export const getReviewQuestions = () => {
  return api.get<TD.ReviewQuestion[]>('/reviews')
}
