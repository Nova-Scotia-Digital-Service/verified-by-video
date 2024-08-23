import * as TD from '../../types'

import { faker } from '@faker-js/faker'

import { transaction } from '../../db'
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

  const reviewQuestionTemplate: { question: string; options: { text: string; valid: boolean }[] }[] = [
    {
      question: 'Did the user correctly follow the prompts in the video?',
      options: [
        { text: 'Yes, all prompts followed by user in the correct order', valid: true },
        { text: "Didn't follow the prompts correctly", valid: false },
        { text: 'Too low quality video/photo for matching', valid: false },
        { text: "Couldn't complete for other reason", valid: false },
      ],
    },
    {
      question: 'What name did they provide?',
      options: [
        { text: `${fakePerson.lastName}, ${fakePerson.firstName} or an acceptable variation`, valid: true },
        { text: "Didn't provide the correct name", valid: false },
        { text: "Couldn't complete for other reason", valid: false },
      ],
    },
    {
      question: 'Do all three match: photo on the ID document, video, photo taken in the app?',
      options: [
        { text: 'Yes, all match', valid: true },
        { text: 'Not all match', valid: false },
        { text: 'Too low quality video or photo for matching', valid: false },
        { text: "Couldn't complete for other reason", valid: false },
      ],
    },
    {
      question: 'What type of ID is provided?',
      options: [
        { text: "Nova Scotia Driver's License", valid: true },
        { text: 'Other type', valid: false },
        { text: "I can't confirm", valid: false },
      ],
    },
    {
      question: "What number is on Nova Scotia Driver's License?",
      options: [
        { text: fakePerson.driversLicenseNumber, valid: true },
        { text: 'Other type', valid: false },
        { text: "I can't confirm", valid: false },
      ],
    },
    {
      question: 'What is the birthdate on the ID?',
      options: [
        { text: fakePerson.birthdate, valid: true },
        { text: 'Does not match', valid: false },
        { text: "I can't confirm", valid: false },
      ],
    },
    {
      question: 'What name is on the ID?',
      options: [
        { text: `${fakePerson.lastName}, ${fakePerson.firstName} or an acceptable variation`, valid: true },
        { text: 'Does not match', valid: false },
        { text: "I can't confirm", valid: false },
      ],
    },
    {
      question: 'Is the ID valid?',
      options: [
        { text: 'Is valid, not expired', valid: true },
        { text: 'Expired', valid: false },
        {
          text: "Doesn't appear to be genuine (e.g. not an original document, missing security feature)",
          valid: false,
        },
        { text: 'Not an acceptable document', valid: false },
      ],
    },
    {
      question: 'Are you confident this is who they say they are?',
      options: [
        { text: 'Yes I am confident', valid: true },
        { text: 'Possible suspicious activity', valid: false },
        { text: 'Not confident enough to verify for other reason', valid: false },
      ],
    },
  ]
  return reviewQuestionTemplate
}

export const createReview = async (reviewer: TD.DBUser, submission_id: string) => {
  return transaction(async (client) => {
    const reviewResult = await client.query<{ id: string }>(
      `
      INSERT INTO reviews (submission_id, reviewer_id)
      VALUES ($1, $2)
      RETURNING id
      `,
      [submission_id, reviewer && reviewer.id],
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

    return reviewResult.rows[0]
  })
}

export const getReview = async (review_id: string) => {
  return transaction(async (client) => {
    const review = await client.query<{
      id: string
      status: TD.ReviewStatus
      submission_id: string
      session_id: string
      video_url: string
      upload_date: Date
      tags: { id: string; text: string }[]
      comment: string | null
    }>(
      `
      WITH
        aggregated_tags AS (
          SELECT
            submission_tags.submission_id,
            jsonb_build_object(
              'id', tags.id,
              'text', tags.text
            ) AS tags
          FROM submission_tags
          JOIN tags ON tags.id = submission_tags.tag_id
          GROUP BY submission_tags.submission_id, tags.id
        )
      SELECT
        reviews.id,
        reviews.status,
        submissions.id as submission_id,
        submissions.session_id,
        submissions.video_url,
        submissions.upload_date,
        array_remove(
          array_agg(aggregated_tags.tags),
          NULL
        ) AS tags,
        review_comments.text as comment
      FROM reviews
      JOIN submissions ON submissions.id = reviews.submission_id
      LEFT JOIN aggregated_tags ON aggregated_tags.submission_id = submissions.id
      LEFT JOIN review_comments ON review_comments.review_id = reviews.id
      WHERE reviews.id = $1
      GROUP BY submissions.id, reviews.id, review_comments.text
      `,
      [review_id],
    )
    const questions = await client.query<{
      id: string
      question: string
      option_id: string
      option_text: string
      option_valid: boolean
    }>(
      `
      SELECT
        review_questions.id,
        review_questions.question,
        review_question_options.id as option_id,
        review_question_options.text as option_text,
        review_question_options.valid as option_valid
      FROM review_questions
      JOIN review_question_options ON review_questions.id = review_question_id
      WHERE review_id = $1
      `,
      [review_id],
    )
    const selected_options = await client.query<{ selected_option_ids: string[] | null }>(
      `
      SELECT
        array_agg(review_answers.option_id) as selected_option_ids
      FROM review_questions
      JOIN review_question_options ON review_questions.id = review_question_id
      JOIN review_answers ON review_question_options.id = review_answers.option_id
      WHERE review_id = $1
      `,
      [review_id],
    )
    const prompts = await client.query<{ id: string; session_id: string; text: string }>(
      `
      SELECT
        id,
        session_id,
        text
      FROM prompts
      WHERE session_id = $1
      `,
      [review.rows[0].session_id],
    )
    const identification_cards = await client.query<{
      id: string
      session_id: string
      description: string
      photo_url?: string
      upload_date?: Date
    }>(
      `
      SELECT
        id,
        session_id,
        description,
        photo_url,
        upload_date
      FROM identification_cards
      WHERE session_id = $1
      `,
      [review.rows[0].session_id],
    )

    return {
      review: review.rows[0],
      questions: questions.rows,
      selectedOptions: selected_options.rows[0].selected_option_ids,
      prompts: prompts.rows,
      identificationCards: identification_cards.rows,
    }
  })
}

export const finishReview = async (
  user: TD.DBUser,
  review_id: string,
  status: Exclude<TD.ReviewStatus, 'STARTED'>,
  answers: string[],
  comment?: string,
) => {
  transaction(async (client) => {
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
  })
}
