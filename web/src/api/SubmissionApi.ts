import * as TD from '../types'

import { api } from './api'

export const getSubmissionList = () => {
  return api.get<TD.APISubmissionSummary[]>('/submissions')
}

export const applySubmissionTag = (submissionId: string, tagId: string) => {
  return api.post(`/submissions/${submissionId}/tag`, { tag_id: tagId })
}

export const removeSubmissionTag = (submissionId: string, tagId: string) => {
  return api.delete(`/submissions/${submissionId}/tag/${tagId}`)
}
