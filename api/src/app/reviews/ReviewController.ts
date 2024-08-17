import * as TD from '../../types'

import { Get, Controller, Param, UseGuards, Post, Body, Req } from '@nestjs/common'
import { ApiBearerAuth as SwaggerRequireAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth/AuthGuard'

import { minioClient } from '../../minio'
import config from '../../config'

import { createReview, getReview, finishReview } from './ReviewData'

@Controller('/staff/reviews')
export class ReviewController {
  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Post('/')
  public async createReview(
    @Req() request: { user: TD.DBUser },
    @Body() body: TD.APICreateReviewRequest,
  ): Promise<TD.APICreateReviewResponse> {
    const { id } = await createReview(request.user, body.submission_id)
    return { id }
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Get('/:review_id')
  public async getReview(@Param('review_id') review_id: string): Promise<TD.Review> {
    const { review, questions, prompts, selectedOptions, identificationCards } = await getReview(review_id)

    const reviewQuestions: TD.ReviewQuestion[] = []

    for (const question of questions) {
      const existingQuestion = reviewQuestions.find(({ id }) => question.id === id)
      if (!existingQuestion) {
        const newQuestion = {
          id: question.id,
          question: question.question,
          options: [
            {
              id: question.option_id,
              text: question.option_text,
              selected: selectedOptions?.includes(question.option_id) || false,
            },
          ],
        }
        reviewQuestions.push(newQuestion)
      } else {
        existingQuestion.options.push({
          id: question.option_id,
          text: question.option_text,
          selected: selectedOptions?.includes(question.option_id) || false,
        })
      }
    }

    let signedVideoUrl = await minioClient.presignedGetObject(config.S3_BUCKET_NAME, review.video_url, 60 * 60)
    if (config.NODE_ENV === 'development') {
      signedVideoUrl = signedVideoUrl.replace('http://minio:9000', 'http://localhost:9002')
    }

    const signedIdentificationCards = await Promise.all(
      identificationCards.map(async (card) => {
        if (!card.photo_url) return card

        let signedPhotoUrl = await minioClient.presignedGetObject(config.S3_BUCKET_NAME, card.photo_url, 60 * 60)
        if (config.NODE_ENV === 'development') {
          signedPhotoUrl = signedPhotoUrl.replace('http://minio:9000', 'http://localhost:9002')
        }
        return {
          ...card,
          photo_url: signedPhotoUrl,
        }
      }),
    )

    return {
      id: review.id,
      status: review.status,
      submission: {
        id: review.submission_id,
        session_id: review.session_id,
        video_url: signedVideoUrl,
        upload_date: review.upload_date,
        tags: review.tags,
      },
      identification_cards: signedIdentificationCards,
      prompts: prompts.map((prompt) => ({ ...prompt, type: 'text' })),
      questions: reviewQuestions,
    }
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Post('/:review_id')
  public async finishReview(
    @Req() request: { user: TD.DBUser },
    @Param('review_id') review_id: string,
    @Body() body: TD.APIFinishReviewRequest,
  ): Promise<void> {
    await finishReview(request.user, review_id, body.status, Object.values(body.answers), body.comment)
  }
}
