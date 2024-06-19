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

  describe('postReview', () => {
    it('accepts data', async () => {
      const reviewId = '532bd3f4-a0c5-4a97-87a9-19d46981747d'

      const reviewAnswers = {
        '1ae8b631-a95d-4b55-a599-aec2919096c0': '80ed0dc2-1a93-4c38-ae36-25cbc8659c53',
        '3ea886c1-b97c-4e30-90bd-f1551df1a632': '3b1ca3d6-de80-4b27-aeff-2c8d4237088c',
        '5f816b66-d431-4642-9822-ae2dbd186e38': '7d479637-c890-47fb-b879-a9c27355e776',
        '5e6fd189-c934-4049-bc00-246f2cd9c85e': '4b85d528-a3a8-49c3-a13d-30c566c0c329',
        '9d211ed5-59c4-415d-b782-be6499205b2f': 'a6005f55-aac0-4e26-ba67-11aff456bf5b',
        '676fac34-b6e5-4cff-b523-0a4bbc7bca88': '357a3e84-8376-4594-ab3f-a6b8c436c2da',
        '71712d42-c574-46cf-826e-f76db3a9749f': '86b271cf-6517-40ac-a11b-ae91c81dbafa',
        '957250ed-35cb-4315-a2f5-3efd4667f829': '64b8cfd3-6d98-40c8-af7a-1dc1c9cc4df2',
        '62333928-ade6-41c6-b131-d11efff04179': '153bc35d-3ae4-4746-abd4-106b12aeb187',
      }

      await new ReviewController().postReview(reviewId, reviewAnswers)
    })
  })
})
