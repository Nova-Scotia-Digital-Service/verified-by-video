import * as TD from '../types'

import { api } from './api'

export const getSubmissionList = () => {
  return api.get<TD.APISubmissionSummary[]>('/submissions')
}
