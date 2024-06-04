import * as TD from '../../types'

import { Get, Controller, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth as SwaggerRequireAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth/AuthGuard'

import { getReview, getReviewList } from './ReviewData'

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

    return {
      ...review,
      submission: {
        id: review.submission_id,
        session_id: review.session_id,
        video_url: review.video_url,
        upload_date: review.upload_date,
      },
      identification_cards: identification_cards,
      prompts: prompts.map((prompt) => ({ ...prompt, type: 'text' })),
      questions: reviewQuestions,
    }
  }
}
