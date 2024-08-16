import * as TD from '../../types'

import { pool } from '../../db'

export const getSubmission = async (submission_id: string) => {
  const submission = await pool.query<{ id: string; session_id: string; video_url: string; upload_date: Date }>(
    `
    SELECT
      id,
      session_id,
      video_url,
      upload_date
    FROM submissions
    WHERE id = $1
    `,
    [submission_id],
  )

  return submission.rows[0]
}

export const getSubmissionList = async () => {
  const submissionsResult = await pool.query<{
    id: string
    upload_date: Date
    status: TD.SubmissionStatus
    reviews: { id: string; status: TD.ReviewStatus; created_at: string; reviewer_name: string }[]
  }>(
    `
    WITH
      aggregated_reviews AS (
        WITH
          aggregated_reviewers AS (
            SELECT
              id,
              full_name
            FROM users
          )
        SELECT
          reviews.submission_id,
          jsonb_agg(
            jsonb_build_object(
              'id', reviews.id,
              'status', reviews.status,
              'created_at', reviews.created_at,
              'reviewer_name', aggregated_reviewers.full_name
            )
          ) AS reviews
        FROM reviews
        LEFT JOIN aggregated_reviewers ON aggregated_reviewers.id = reviews.reviewer_id
        GROUP BY reviews.submission_id
      )
    SELECT
      submissions.id,
      submissions.upload_date,
      submissions.status,
      COALESCE(
        aggregated_reviews.reviews,
        '[]'
      ) AS reviews
    FROM submissions
    LEFT JOIN aggregated_reviews ON aggregated_reviews.submission_id = submissions.id
    ORDER BY upload_date ASC
    `,
  )

  return submissionsResult.rows
}

export const createSubmission = async (session_id: string, video_url: string) => {
  const submission = await pool.query<TD.DBSubmission>(
    `
    INSERT INTO submissions (session_id, video_url)
    VALUES
      ($1, $2)
    RETURNING *
  `,
    [session_id, video_url],
  )

  return submission.rows[0]
}

export const createPhotoID = async (session_id: string, description: string, photo_url: string) => {
  const createdPhotoID = await pool.query<TD.DBIdentificationCard>(
    `
    INSERT INTO identification_cards (session_id, description, photo_url)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `,
    [session_id, description, photo_url],
  )

  return createdPhotoID.rows[0]
}
