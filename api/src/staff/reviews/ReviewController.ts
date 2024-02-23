import { Authorized, Get, JsonController, Param } from 'routing-controllers'
import { Service } from 'typedi'

import { mockReviewList, mockReview } from './ReviewData'

@JsonController('/staff/reviews')
@Service()
export class ReviewController {
  @Authorized()
  @Get('/')
  public async getReviewList() {
    return mockReviewList
  }

  @Authorized()
  @Get('/:reviewId')
  public async getReview(@Param('reviewId') reviewId: string) {
    return mockReview
  }
}
