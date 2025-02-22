import * as TD from '../../types/index'

import { pool, transaction } from '../../db'

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
    tags: { id: string; text: string }[]
    reviews: { id: string; status: TD.ReviewStatus; created_at: string; reviewer_name: string }[]
  }>(
    `
    WITH
      aggregated_tags AS (
        SELECT
          submission_tags.submission_id,
          jsonb_agg(
            jsonb_build_object(
              'id', tags.id,
              'text', tags.text
            )
          ) AS tags
        FROM submission_tags
        JOIN tags ON tags.id = submission_tags.tag_id
        GROUP BY submission_tags.submission_id
      ),
      aggregated_reviews AS (
        WITH
          aggregated_reviewers AS (
            SELECT
              id,
              full_name
            FROM reviewers
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
        aggregated_tags.tags,
        '[]'
      ) AS tags,
      COALESCE(
        aggregated_reviews.reviews,
        '[]'
      ) AS reviews
    FROM submissions
    LEFT JOIN aggregated_tags ON aggregated_tags.submission_id = submissions.id
    LEFT JOIN aggregated_reviews ON aggregated_reviews.submission_id = submissions.id
    ORDER BY upload_date ASC
    `,
  )

  return submissionsResult.rows
}

export const createSubmission = async (session_id: string, submitter: TD.Submitter, video_url: string) => {
  return transaction(async (client) => {
    const submitterResult = await client.query<{ id: string }>(
      `
        INSERT INTO submitters (
          license_number,
          first_name,
          last_name,
          birthdate,
          street_address, 
          locality,   
          region,     
          postal_code, 
          country,   
          expiry_date_dateint,
          picture         
        )
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING
          id
      `,
      [
        submitter.driversLicenseNumber,
        submitter.firstName,
        submitter.lastName,
        submitter.birthdate,
        submitter.street_address,
        submitter.locality,
        submitter.region,
        submitter.postal_code,
        submitter.country,
        submitter.expiry_date_dateint,
        submitter.picture,
      ],
    )
    const submitter_id = submitterResult.rows[0].id

    const submissionResult = await client.query<{
      id: string
      session_id: string
      video_url: string
      upload_date: Date
    }>(
      `
        INSERT INTO submissions (session_id, submitter_id, video_url)
        VALUES
          ($1, $2, $3)
        RETURNING
          id,
          session_id,
          video_url,
          upload_date
        `,
      [session_id, submitter_id, video_url],
    )

    return submissionResult.rows[0]
  })
}

export const createPhotoID = async (session_id: string, description: string, photo_url: string | null) => {
  const createdPhotoID = await pool.query<{
    id: string
    session_id: string
    description: string
    photo_url?: string
    upload_date?: Date
  }>(
    `
    INSERT INTO identification_cards (session_id, description, photo_url)
    VALUES
      ($1, $2, $3)
    RETURNING
      id,
      session_id,
      description,
      photo_url,
      upload_date
    `,
    [session_id, description, photo_url],
  )

  return createdPhotoID.rows[0]
}
