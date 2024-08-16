import * as TD from '../../types'

import { faker } from '@faker-js/faker'

import { pool } from '../../db'
import { buildNestedPgParams, buildPgParams } from '../../utils/buildPgParams'

const generateReviewQuestions = () => {
  const fakePerson = {
    firstName: faker.person.firstName().toUpperCase(),
    lastName: faker.person.lastName().toUpperCase(),
    driversLicenseNumber: faker.string.numeric(8),
    birthdate: faker.date.birthdate().toLocaleDateString('en-CA', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  }

  const reviewQuestionTemplate: { question: string; options: { text: string }[] }[] = [
    {
      question: 'Did the user correctly follow the prompts in the video?',
      options: [
        { text: 'Yes, all prompts followed by user in the correct order' },
        { text: "Didn't follow the prompts correctly" },
        { text: 'Too low quality video/photo for matching' },
        { text: "Couldn't complete for other reason" },
      ],
    },
    {
      question: 'What name did they provide?',
      options: [
        { text: `${fakePerson.lastName}, ${fakePerson.firstName} or an acceptable variation` },
        { text: "Didn't provide the correct name" },
        { text: "Couldn't complete for other reason" },
      ],
    },
    {
      question: 'Do all three match: photo on the ID document, video, photo taken in the app?',
      options: [
        { text: 'Yes, all match' },
        { text: 'Not all match' },
        { text: 'Too low quality video or photo for matching' },
        { text: "Couldn't complete for other reason" },
      ],
    },
    {
      question: 'What type of ID is provided?',
      options: [{ text: "Nova Scotia Driver's License" }, { text: 'Other type' }, { text: "I can't confirm" }],
    },
    {
      question: "What number is on Nova Scotia Driver's License?",
      options: [{ text: fakePerson.driversLicenseNumber }, { text: 'Other type' }, { text: "I can't confirm" }],
    },
    {
      question: 'What is the birthdate on the ID?',
      options: [{ text: fakePerson.birthdate }, { text: 'Does not match' }, { text: "I can't confirm" }],
    },
    {
      question: 'What name is on the ID?',
      options: [
        { text: `${fakePerson.lastName}, ${fakePerson.firstName} or an acceptable variation` },
        { text: 'Does not match' },
        { text: "I can't confirm" },
      ],
    },
    {
      question: 'Is the ID valid?',
      options: [
        { text: 'Is valid, not expired' },
        { text: 'Expired' },
        { text: "Doesn't appear to be genuine (e.g. not an original document, missing security feature)" },
        { text: 'Not an acceptable document' },
      ],
    },
    {
      question: 'Are you confident this is who they say they are?',
      options: [
        { text: 'Yes I am confident' },
        { text: 'Possible suspicious activity' },
        { text: 'Not confident enough to verify for other reason' },
      ],
    },
  ]
  return reviewQuestionTemplate
}

export const createReview = async (submission_id: string) => {
  const client = await pool.connect()
  await client.query('BEGIN')
  const reviewResult = await client.query<Pick<TD.DBReview, 'id'>>(
    `
    INSERT INTO reviews (submission_id)
    VALUES ($1)
    RETURNING id
  `,
    [submission_id],
  )

  const reviewQuestions = generateReviewQuestions()
  await Promise.all(
    reviewQuestions.map(async (question) => {
      const questionResult = await client.query<{ id: string }>(
        `
      INSERT INTO review_questions (review_id, question)
      VALUES ($1, $2)
      RETURNING id

      `,
        [reviewResult.rows[0].id, question.question],
      )

      const reviewQuestionId = questionResult.rows[0].id
      const questionOptionPairs = question.options.map((option) => [reviewQuestionId, option.text])
      await client.query(
        `
      INSERT INTO review_question_options (review_question_id, text)
      VALUES ${buildNestedPgParams(questionOptionPairs)}
      `,
        questionOptionPairs.flat(),
      )
    }),
  )

  await client.query(
    `
    UPDATE submissions
    SET
      status = 'UNDER_REVIEW'
    WHERE id = $1
    `,
    [submission_id],
  )

  await client.query('COMMIT')
  await client.release()

  return reviewResult.rows[0]
}

export const getReviewList = async () => {
  const reviews = await pool.query<TD.DBReviewSummary>(
    `
    SELECT
      reviews.id,
      reviews.status,
      submissions.id as submission_id,
      submissions.session_id,
      submissions.video_url,
      submissions.upload_date,
      array_remove(
        array_agg(tags.text),
        NULL
      ) AS tags,
      to_json(users) as reviewer
    FROM reviews
    JOIN submissions ON submissions.id = reviews.submission_id
    LEFT JOIN review_tags ON review_tags.review_id = reviews.id
    LEFT JOIN tags ON tags.id = review_tags.tag_id
    LEFT JOIN users ON users.id = reviews.reviewer_id
    GROUP BY submissions.id, reviews.id, users.id
    ORDER BY upload_date ASC
    `,
  )

  return reviews.rows
}

export const getReview = async (review_id: string) => {
  const client = await pool.connect()
  await client.query('BEGIN')
  const review = await client.query<TD.DBReviewSummary>(
    `
    SELECT
      reviews.id,
      reviews.status,
      submissions.id as submission_id,
      submissions.session_id,
      submissions.video_url,
      submissions.upload_date,
      array_remove(
        array_agg(tags.text),
        NULL
      ) AS tags
    FROM reviews
    JOIN submissions ON submissions.id = reviews.submission_id
    LEFT JOIN review_tags ON review_tags.review_id = reviews.id
    LEFT JOIN tags ON tags.id = review_tags.tag_id
    WHERE reviews.id = $1
    GROUP BY submissions.id, reviews.id`,
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
      session_id,
      description,
      photo_url,
      upload_date
    FROM identification_cards
    WHERE session_id = $1`,
    [review.rows[0].session_id],
  )
  await client.query('COMMIT')
  await client.release()

  return [review.rows[0], questions.rows, prompts.rows, identification_cards.rows] as const
}

export const postReviewAnswers = async (
  user: TD.DBUser,
  review_id: string,
  status: Exclude<TD.ReviewStatus, 'STARTED'>,
  answers: string[],
  comment?: string,
) => {
  const client = await pool.connect()
  await client.query('BEGIN')
  await client.query(
    `
    INSERT INTO review_answers
      (option_id)
    VALUES
      ${buildPgParams(answers)}
    `,
    answers,
  )
  await client.query(
    `
    UPDATE reviews
    SET
      status = $1,
      reviewer_id = $2
    WHERE id = $3
    `,
    [status, user.id, review_id],
  )
  if (comment) {
    await client.query(
      `
      INSERT INTO review_comments
        (review_id, reviewer_id, text)
      VALUES
        ($1, $2, $3)
      `,
      [review_id, user.id, comment],
    )
  }

  const submissionStatus: TD.SubmissionStatus = status
  await client.query(
    `
    UPDATE submissions
    SET
      status = $2
    FROM reviews
    WHERE
      submissions.id = reviews.submission_id
      AND reviews.id = $1
    `,
    [review_id, submissionStatus],
  )

  await client.query('COMMIT')
  await client.release()
}
