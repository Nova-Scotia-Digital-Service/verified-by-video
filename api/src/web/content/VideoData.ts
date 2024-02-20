import * as TD from '../../types'

import { v4 as uuid } from 'uuid'

import { prompts } from '../../mobile/content/SessionData'
import { reviewQuestions } from './ReviewData'

const randomDate = () => new Date(1500000000000 + Math.random() * 250000000000)

export const videos: TD.VideoData[] = [
  { id: 'a', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'b', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'c', upload_date: randomDate(), status: 'Unreviewed' },
  { id: 'd', upload_date: randomDate(), status: 'Approved' },
  { id: 'e', upload_date: randomDate(), status: 'Approved' },
  { id: 'f', upload_date: randomDate(), status: 'Denied' },
]

export const videoReview: TD.VideoReview = {
  id: uuid(),
  video: {
    id: uuid(),
    prompts: prompts,
    upload_date: randomDate(),
  },
  identification_cards: [
    {
      id: uuid(),
      description: 'Photo on BC Services Card',
    },
    {
      id: uuid(),
      description: 'Photo from the mobile app',
      date: randomDate(),
      photo: true,
    },
    {
      id: uuid(),
      description: "Front of BC Driver's License (issued in British Columbia)",
      date: randomDate(),
      photo: true,
    },
    {
      id: uuid(),
      description: "Back of BC Driver's License (issued in British Columbia)",
      date: randomDate(),
      photo: true,
    },
  ],
  questions: reviewQuestions,
}
