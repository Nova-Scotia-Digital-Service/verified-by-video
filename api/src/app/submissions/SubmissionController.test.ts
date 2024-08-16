import { Readable } from 'stream'

import { pool } from '../../db'
import { populateDb, unpopulateDb } from '../../../test/testUtils'

import { StaffSubmissionController, SubmissionController } from './SubmissionController'
import { ReviewController } from '../reviews/ReviewController'

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

  describe('applyTagToSubmission', () => {
    it('applies a tag to a submission', async () => {
      const reviewId = 'cbb5b46a-ad3b-4a5f-954f-bff18024d1d6'
      const tagId = 'fc1bdf3c-6457-4604-aeb6-48ba42a73eb9'

      const reviewBefore = await new ReviewController().getReview(reviewId)
      expect(reviewBefore.submission.tags).toEqual([])

      await new StaffSubmissionController().applyTagToSubmission(reviewBefore.submission.id, { tag_id: tagId })

      const reviewAfter = await new ReviewController().getReview(reviewId)
      expect(reviewAfter.submission.tags).toEqual([{ id: tagId, text: 'Tag 3' }])
    })
  })

  describe('removeTagFromSubmission', () => {
    it('removes a tag from a submission', async () => {
      const reviewId = 'cbb5b46a-ad3b-4a5f-954f-bff18024d1d6'
      const otherReviewId = '532bd3f4-a0c5-4a97-87a9-19d46981747d'
      const tagId = 'fc1bdf3c-6457-4604-aeb6-48ba42a73eb9'

      const reviewBefore = await new ReviewController().getReview(reviewId)
      const otherReviewBefore = await new ReviewController().getReview(otherReviewId)
      expect(reviewBefore.submission.tags).toEqual([{ id: tagId, text: 'Tag 3' }])
      expect(otherReviewBefore.submission.tags.length).toBe(2)

      await new StaffSubmissionController().removeTagFromSubmission(reviewBefore.submission.id, tagId)

      const reviewAfter = await new ReviewController().getReview(reviewId)
      const otherReviewAfter = await new ReviewController().getReview(otherReviewId)
      expect(reviewAfter.submission.tags).toEqual([])
      expect(otherReviewAfter.submission.tags.length).toBe(2)
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
