import * as TD from '../types'

import { api } from './api'

export const getTagList = () => {
  return api.get<TD.Tag[]>('/tags')
}

export const postTag = (text: string) => {
  return api.post<TD.Tag>('/tags', { text })
}

export const deleteTag = (tagId: string) => {
  return api.delete(`/tags/${tagId}`)
}
