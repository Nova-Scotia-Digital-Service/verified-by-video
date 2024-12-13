import * as TD from '../../types'
import { Get, Controller, Param, UseGuards, Post, Body, Req } from '@nestjs/common'
import { ApiBearerAuth as SwaggerRequireAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth/AuthGuard'

import { signMinioUrl } from '../../minio'

import { createReview, getReview, finishReview, getConnectionIdForReview } from './ReviewData'

import { offerCredential } from '../../utils/traction'
import { imageData } from './image' // Testing only

@Controller('/staff/reviews')
export class ReviewController {
  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Post('/')
  public async createReview(
    @Req() request: { user: TD.DBReviewer },
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
              valid: question.option_valid,
            },
          ],
        }
        reviewQuestions.push(newQuestion)
      } else {
        existingQuestion.options.push({
          id: question.option_id,
          text: question.option_text,
          selected: selectedOptions?.includes(question.option_id) || false,
          valid: question.option_valid,
        })
      }
    }

    const signedVideoUrl = await signMinioUrl(review.video_url)

    const signedIdentificationCards = await Promise.all(
      identificationCards.map(async (card) => {
        if (!card.photo_url) return card

        const signedPhotoUrl = await signMinioUrl(card.photo_url)

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
      comment: review.comment,
    }
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Post('/:review_id')
  public async finishReview(
    @Req() request: { user: TD.DBReviewer },
    @Param('review_id') review_id: string,
    @Body() body: TD.APIFinishReviewRequest,
  ): Promise<void> {
    await finishReview(request.user, review_id, body.status, Object.values(body.answers), body.comment)

    if (body.status === 'APPROVED') {
      const connection_id = await getConnectionIdForReview(review_id)

      if (!connection_id) {
        console.error(`No connection id found for review ${review_id}, unable to issue credential`)

        return
      }

      const credential: TD.PersonCredential = {
        connection_id,
        auto_issue: true,
        auto_remove: true,
        trace: true,
        cred_def_id: 'DCQff261iuknbdF1Z8dW2b:3:CL:1060609:person_v2',
        credential_preview: {
          '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
          attributes: [
            {
              name: 'family_name',
              value: 'Joyce',
            },
            {
              name: 'given_names',
              value: 'Lee-Martinez',
            },
            {
              name: 'birthdate_dateint',
              value: '1980-12-21',
            },
            {
              name: 'street_address',
              value: '123 Main St',
            },
            {
              name: 'locality',
              value: 'Antigonish',
            },
            {
              name: 'region',
              value: 'Nova Scotia',
            },
            {
              name: 'postal_code',
              value: 'V8R 4P3',
            },
            {
              name: 'country',
              value: 'Canada',
            },
            {
              name: 'expiry_date_dateint',
              value: '2026-01-01',
            },
            {
              name: 'picture',
              value: imageData,
            },
          ],
        },
        comment: 'Issued by the review',
      }

      await offerCredential(credential)
    }
  }
}
