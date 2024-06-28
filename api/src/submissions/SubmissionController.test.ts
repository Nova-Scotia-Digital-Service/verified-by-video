import { Readable } from 'stream'

import { pool } from '../db'

import { SubmissionController } from './SubmissionController'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const VIDEO_URL_REGEX = /^media\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.mp4$/

describe('SubmissionController', () => {
  describe('createSubmission', () => {
    it('returns data', async () => {
      const sessionId = '88acfa3d-bf2f-4cae-8746-60a9106f6d56'
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'file.mp4',
        encoding: 'utf-8',
        mimetype: 'video/mp4',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
        buffer: Buffer.from(''),
      }
      const newSubmission = await new SubmissionController().createSubmission(
        { sessionId, file: undefined as any },
        file,
      )
      expect(newSubmission.id).toMatch(UUID_REGEX)
      expect(newSubmission.session_id).toBe(sessionId)
      expect(newSubmission.upload_date).toBeInstanceOf(Date)
      expect(newSubmission.video_url).toMatch(VIDEO_URL_REGEX)
    })
  })

  describe('getSubmission', () => {
    it('returns data with correct id', async () => {
      const submissionId = '214f747f-778a-4d4b-ab3b-5ed0c9410c69'
      expect(await new SubmissionController().getSubmission(submissionId)).toStrictEqual({
        id: submissionId,
        video_url: '/media/example-video.mp4',
        session_id: '88acfa3d-bf2f-4cae-8746-60a9106f6d56',
        upload_date: new Date('2024-05-08 19:01:48.776913+00'),
      })
    })
  })
})

afterAll(() => {
  pool.end()
})
