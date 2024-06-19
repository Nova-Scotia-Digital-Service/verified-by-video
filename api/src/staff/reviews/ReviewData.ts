import * as TD from '../../types'

import { pgClient } from '../../db'
import { buildPgParams } from '../../utils/buildPgParams'

export const getReviewList = async () => {
  const client = pgClient()
  await client.connect()
  const reviews = await client.query<TD.DBReviewSummary>(`
    SELECT
      reviews.id,
      reviews.status,
      submissions.id as submission_id,
      submissions.session_id,
      submissions.video_url,
      submissions.upload_date
    FROM reviews
    JOIN submissions ON submissions.id = reviews.submission_id`)
  await client.end()

  return reviews.rows
}

export const getReview = async (review_id: string) => {
  const client = pgClient()
  await client.connect()
  const review = await client.query<TD.DBReviewSummary>(
    `
    SELECT
      reviews.id,
      reviews.status,
      submissions.id as submission_id,
      submissions.session_id,
      submissions.video_url,
      submissions.upload_date
    FROM reviews
    JOIN submissions ON submissions.id = reviews.submission_id
    WHERE reviews.id = $1`,
    [review_id],
  )
  const questions = await client.query<{ id: string; question: string; option_id: string; option_text: string }>(
    `
    SELECT
      review_questions.id,
      review_questions.question,
      review_question_options.id as option_id,
      review_question_options.text as option_text
    FROM review_questions
    JOIN review_question_options ON review_questions.id = review_question_id
    WHERE review_id = $1`,
    [review_id],
  )
  const prompts = await client.query<TD.DBPrompt>(
    `
    SELECT
      id,
      session_id,
      text
    FROM prompts
    WHERE session_id = $1`,
    [review.rows[0].session_id],
  )
  const identification_cards = await client.query<TD.DBIdentificationCard>(
    `
    SELECT
      id,
      submission_id,
      description,
      photo_url,
      upload_date
    FROM identification_cards
    WHERE submission_id = $1`,
    [review.rows[0].submission_id],
  )
  await client.end()

  return [review.rows[0], questions.rows, prompts.rows, identification_cards.rows] as const
}

export const postReviewAnswers = async (review_id: string, answers: string[]) => {
  const client = pgClient()
  await client.connect()
  await client.query(
    `
    INSERT INTO review_answers
      (option_id)
    VALUES
      ${buildPgParams(answers)}`,
    answers,
  )
  await client.query(
    `
    UPDATE reviews
    SET status = 'APPROVED'
    WHERE id = $1`,
    [review_id],
  )
  await client.end()
}
