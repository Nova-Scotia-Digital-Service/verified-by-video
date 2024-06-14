import { ReviewController } from './ReviewController'

const SIGNED_URL_REGEX = /^https?\:\/\/.*Amz-Signature=[0-9a-z]{64}$/

// replace variable signed urls in snapshot with constant string
expect.addSnapshotSerializer({
  serialize: () => 'Any<SignedURL>',
  test: (val) => val && typeof val === 'string' && SIGNED_URL_REGEX.test(val),
})

describe('ReviewController', () => {
  describe('getReviewList', () => {
    it('returns data', async () => {
      expect(await new ReviewController().getReviewList()).toMatchSnapshot()
    })
  })

  describe('getReview', () => {
    it('returns data', async () => {
      const reviewId = '532bd3f4-a0c5-4a97-87a9-19d46981747d'
      expect(await new ReviewController().getReview(reviewId)).toMatchSnapshot()
    })
  })
})
