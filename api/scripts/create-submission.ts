import { configDotenv } from 'dotenv'

import { getSubmitterIdentity } from '../src/utils/getSubmitterIdentity'

import { createSession } from '../src/app/sessions/SessionData'
import { createPhotoID, createSubmission } from '../src/app/submissions/SubmissionData'

configDotenv()

const generateSubmissions = async (count) => {
  for (let index = 0; index < count; index++) {
    const session = await createSession()

    const mockSubmitter = await getSubmitterIdentity()

    const submission = await createSubmission(session.id, mockSubmitter, 'media/example-video.mp4')
    await createPhotoID(session.id, 'Photo from the mobile app', 'media/example-photo-from-app.png')
    await createPhotoID(session.id, "Front of Nova Scotia Driver's License", 'media/example-photo-license-front.png')
    await createPhotoID(session.id, "Back of Nova Scotia Driver's License", 'media/example-photo-license-back.png')
    await createPhotoID(session.id, 'Library Card', null)

    console.log(`Submission created: http://localhost:3000/submissions/${submission.id}`)
  }

  process.exit(0)
}

try {
  if (process.argv.length > 3) throw new Error('Too many arguments')

  let count = 1
  const countArg = process.argv[2]
  if (countArg !== undefined) {
    count = parseInt(countArg, 10)
    if (Number.isNaN(count)) throw new Error(`"${countArg}" is not a number`)
  }

  generateSubmissions(count)
} catch (error) {
  console.error(`${error}`)
  console.log('Usage:')
  console.log('\tyarn create-submission [COUNT]')
  process.exit(1)
}
