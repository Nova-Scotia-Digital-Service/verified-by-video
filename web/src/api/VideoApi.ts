import * as TD from '../types'

import { api } from './api'

export const getVideos = () => {
  return api.get<TD.VideoData[]>('/videos')
}
