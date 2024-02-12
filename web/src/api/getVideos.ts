import type { AxiosResponse } from 'axios'
import { VideoData } from '../types'

const randomDate = () => new Date(1500000000000 + Math.random() * 250000000000)

const mockVideos: VideoData[] = [
  { id: 'a', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'b', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'c', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'd', upload_date: randomDate(), status: 'Approved' },
  { id: 'e', upload_date: randomDate(), status: 'Approved' },
  { id: 'f', upload_date: randomDate(), status: 'Denied' },
]

export const getVideos = () => {
  return mockVideos
}
