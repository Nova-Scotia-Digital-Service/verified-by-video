import { Get, Controller, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth as SwaggerRequireAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth/AuthGuard'

import { mockReviewList, mockReview } from './ReviewData'

@Controller('/staff/reviews')
export class ReviewController {
  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Get('/')
  public async getReviewList() {
    return mockReviewList
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Get('/:reviewId')
  public async getReview(@Param('reviewId') reviewId: string) {
    return mockReview
  }
}
