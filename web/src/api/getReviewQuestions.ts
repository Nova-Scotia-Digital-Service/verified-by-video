import * as TD from '../types'

const reviewQuestions: TD.ReviewQuestion[] = [
  {
    id: 'followed-prompts',
    question: 'Did the user correctly follow the prompts in the video?',
    options: [
      'Yes, all prompts followed by user in the correct order',
      "Didn't follow the prompts correctly",
      'Too low quality video/photo for matching',
      "Couldn't complete for other reason",
    ],
  },
  {
    id: 'provided-name',
    question: 'What name did they provide?',
    options: [
      'NONPHOTO, PERCY or an acceptable variation',
      "Didn't provide the correct name",
      "Couldn't complete for other reason",
    ],
  },

  {
    id: 'all-match',
    question: 'Do all three match: photo on the ID document, video, photo taken in the app?',
    options: [
      'Yes, all match',
      'Not all match',
      'Too low quality video or photo for matching',
      "Couldn't complete for other reason",
    ],
  },
]

export const getReviewQuestions = () => {
  return reviewQuestions
}
