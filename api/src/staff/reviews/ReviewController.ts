import * as TD from '../../types'

import { Get, Controller, Param, UseGuards, Post, Body } from '@nestjs/common'
import { ApiBearerAuth as SwaggerRequireAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth/AuthGuard'

import { getReview, getReviewList, postReviewAnswers } from './ReviewData'
import { minioClient } from '../../minio'
import config from '../../config'

@Controller('/staff/reviews')
export class ReviewController {
  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Get('/')
  public async getReviewList(): Promise<TD.ReviewList> {
    return (await getReviewList()).map(({ id, status, submission_id, session_id, video_url, upload_date }) => ({
      id,
      status,
      submission: {
        id: submission_id,
        session_id,
        video_url,
        upload_date,
      },
    }))
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Get('/:review_id')
  public async getReview(@Param('review_id') review_id: string): Promise<TD.Review> {
    const [review, questions, prompts, identification_cards] = await getReview(review_id)

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
            },
          ],
        }
        reviewQuestions.push(newQuestion)
      } else {
        existingQuestion.options.push({
          id: question.option_id,
          text: question.option_text,
        })
      }
    }

    let signedVideoUrl = await minioClient.presignedGetObject(config.S3_BUCKET_NAME, review.video_url, 60 * 60)
    if (config.NODE_ENV === 'development') {
      signedVideoUrl = signedVideoUrl.replace('http://minio', 'http://localhost')
    }

    const signedIdentificationCards = await Promise.all(
      identification_cards.map(async (card) => {
        if (card.photo_url === undefined) return card

        let signedPhotoUrl = await minioClient.presignedGetObject(config.S3_BUCKET_NAME, card.photo_url, 60 * 60)
        if (config.NODE_ENV === 'development') {
          signedPhotoUrl = signedPhotoUrl.replace('http://minio', 'http://localhost')
        }
        return {
          ...card,
          photo_url: signedPhotoUrl,
        }
      }),
    )

    return {
      ...review,
      submission: {
        id: review.submission_id,
        session_id: review.session_id,
        video_url: signedVideoUrl,
        upload_date: review.upload_date,
      },
      identification_cards: signedIdentificationCards,
      prompts: prompts.map((prompt) => ({ ...prompt, type: 'text' })),
      questions: reviewQuestions,
    }
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Post('/:review_id')
  public async postReview(@Param('review_id') review_id: string, @Body() review_answers): Promise<void> {
    await postReviewAnswers(review_id, Object.values(review_answers))
  }
}
