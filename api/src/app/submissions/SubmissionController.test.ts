import { Readable } from 'stream'

import { pool } from '../../db'
import { populateDb, unpopulateDb } from '../../../test/testUtils'

import { StaffSubmissionController, SubmissionController } from './SubmissionController'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const VIDEO_URL_REGEX = /^media\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.mp4$/
const PHOTO_URL_REGEX = /^media\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.png$/

beforeAll(async () => {
  await populateDb()
})

afterAll(async () => {
  await unpopulateDb()
  await pool.end()
})

describe('StaffSubmissionController', () => {
  describe('getSubmissionList', () => {
    it('returns expected data', async () => {
      const submissionList = await new StaffSubmissionController().getSubmissionList()
      expect(submissionList).toMatchSnapshot()
    })
  })
})

describe('SubmissionController', () => {
  describe('createPhotoID', () => {
    it('posts a photo', async () => {
      const sessionId = '88acfa3d-bf2f-4cae-8746-60a9106f6d56'
      const photo_file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'file.png',
        encoding: 'utf-8',
        mimetype: 'image/png',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
        buffer: Buffer.from(''),
      }
      const newPhotoID = await new SubmissionController().createPhotoID(
        { sessionId, description: 'a test file', photo_file: undefined as any },
        photo_file,
      )
      expect(newPhotoID.id).toMatch(UUID_REGEX)
      expect(newPhotoID.session_id).toBe(sessionId)
      expect(newPhotoID.upload_date).toBeInstanceOf(Date)
      expect(newPhotoID.photo_url).toMatch(PHOTO_URL_REGEX)
    })
  })

  describe('createSubmission', () => {
    it('returns data', async () => {
      const sessionId = '88acfa3d-bf2f-4cae-8746-60a9106f6d56'
      const video_file: Express.Multer.File = {
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
        { sessionId, video_file: undefined as any },
        video_file,
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
