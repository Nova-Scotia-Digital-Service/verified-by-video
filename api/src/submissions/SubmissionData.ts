import * as TD from '../types'

import { initialSessionData } from '../sessions/SessionData'

export const mockSubmission: TD.Submission = {
  id: '214f747f-778a-4d4b-ab3b-5ed0c9410c69',
  video_url: '/media/example-video.mp4',
  session_id: initialSessionData.id,
  upload_date: new Date(),
}
