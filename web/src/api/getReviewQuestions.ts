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
  {
    id: 'id-type',
    question: 'What type of ID is provided?',
    options: ["BC Driver's License (issued by British Columbia)", 'Other type', "I can't confirm"],
  },
  {
    id: 'id-number',
    question: "What number is on BC Driver's License (issued in British Columbia)?",
    options: ['12121212', 'Other type', "I can't confirm"],
  },
  {
    id: 'id-birthdate',
    question: 'What is the birthdate on the ID?',
    options: ['January 1, 1990', 'Does not match', "I can't confirm"],
  },
  {
    id: 'id-name',
    question: 'What name is on the ID?',
    options: ['NONPHOTO, PERCY or an acceptable variation', 'Does not match', "I can't confirm"],
  },
  {
    id: 'id-valid',
    question: 'Is the ID valid?',
    options: [
      'Is valid, not expired',
      'Expired',
      "Doesn't appear to be genuine (e.g. not an original document, missing security feature)",
      'Not an acceptable document',
    ],
  },
  {
    id: 'confidence',
    question: 'Are you confident this is who they say they are?',
    options: ['Yes I am confident', 'Possible suspicious activity', 'Not confident enough to verify for other reason'],
  },
]

export const getReviewQuestions = () => {
  return reviewQuestions
}
