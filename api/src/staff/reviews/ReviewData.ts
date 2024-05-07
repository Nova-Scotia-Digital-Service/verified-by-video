import * as TD from '../../types'

import { v4 as uuid } from 'uuid'

import { prompts } from '../../sessions/SessionData'
import { mockSubmission } from '../../submissions/SubmissionData'

const randomDate = () => new Date(1500000000000 + Math.random() * 250000000000)

export const mockReviewList: TD.ReviewList = [
  { id: 'a', submission: mockSubmission, status: 'Unreviewed' },
  { id: 'b', submission: mockSubmission, status: 'Unreviewed' },
  { id: 'c', submission: mockSubmission, status: 'Unreviewed' },
  { id: 'd', submission: mockSubmission, status: 'Approved' },
  { id: 'e', submission: mockSubmission, status: 'Approved' },
  { id: 'f', submission: mockSubmission, status: 'Denied' },
]

export const mockReviewQuestions: TD.ReviewQuestion[] = [
  {
    id: 'followed-prompts',
    question: 'Did the user correctly follow the prompts in the video?',
    options: [
      { id: uuid(), text: 'Yes, all prompts followed by user in the correct order' },
      { id: uuid(), text: "Didn't follow the prompts correctly" },
      { id: uuid(), text: 'Too low quality video/photo for matching' },
      { id: uuid(), text: "Couldn't complete for other reason" },
    ],
  },
  {
    id: 'provided-name',
    question: 'What name did they provide?',
    options: [
      { id: uuid(), text: 'NONPHOTO, PERCY or an acceptable variation' },
      { id: uuid(), text: "Didn't provide the correct name" },
      { id: uuid(), text: "Couldn't complete for other reason" },
    ],
  },
  {
    id: 'all-match',
    question: 'Do all three match: photo on the ID document, video, photo taken in the app?',
    options: [
      { id: uuid(), text: 'Yes, all match' },
      { id: uuid(), text: 'Not all match' },
      { id: uuid(), text: 'Too low quality video or photo for matching' },
      { id: uuid(), text: "Couldn't complete for other reason" },
    ],
  },
  {
    id: 'id-type',
    question: 'What type of ID is provided?',
    options: [
      { id: uuid(), text: "Nova Scotia Driver's License" },
      { id: uuid(), text: 'Other type' },
      { id: uuid(), text: "I can't confirm" },
    ],
  },
  {
    id: 'id-number',
    question: "What number is on Nova Scotia Driver's License?",
    options: [
      { id: uuid(), text: '12121212' },
      { id: uuid(), text: 'Other type' },
      { id: uuid(), text: "I can't confirm" },
    ],
  },
  {
    id: 'id-birthdate',
    question: 'What is the birthdate on the ID?',
    options: [
      { id: uuid(), text: 'January 1, 1990' },
      { id: uuid(), text: 'Does not match' },
      { id: uuid(), text: "I can't confirm" },
    ],
  },
  {
    id: 'id-name',
    question: 'What name is on the ID?',
    options: [
      { id: uuid(), text: 'NONPHOTO, PERCY or an acceptable variation' },
      { id: uuid(), text: 'Does not match' },
      { id: uuid(), text: "I can't confirm" },
    ],
  },
  {
    id: 'id-valid',
    question: 'Is the ID valid?',
    options: [
      { id: uuid(), text: 'Is valid, not expired' },
      { id: uuid(), text: 'Expired' },
      { id: uuid(), text: "Doesn't appear to be genuine (e.g. not an original document, missing security feature)" },
      { id: uuid(), text: 'Not an acceptable document' },
    ],
  },
  {
    id: 'confidence',
    question: 'Are you confident this is who they say they are?',
    options: [
      { id: uuid(), text: 'Yes I am confident' },
      { id: uuid(), text: 'Possible suspicious activity' },
      { id: uuid(), text: 'Not confident enough to verify for other reason' },
    ],
  },
]

export const mockReview: TD.Review = {
  id: uuid(),
  status: 'Unreviewed',
  submission: mockSubmission,
  prompts: prompts,
  identification_cards: [
    {
      id: uuid(),
      description: 'Photo on Nova Scotia Health Card',
    },
    {
      id: uuid(),
      description: 'Photo from the mobile app',
      date: randomDate(),
      photo_url: '/media/example-photo-from-app.png',
    },
    {
      id: uuid(),
      description: "Front of Nova Scotia Driver's License",
      date: randomDate(),
      photo_url: '/media/example-photo-license-front.png',
    },
    {
      id: uuid(),
      description: "Back of Nova Scotia Driver's License",
      date: randomDate(),
      photo_url: '/media/example-photo-license-back.png',
    },
  ],
  questions: mockReviewQuestions,
}
