import * as TD from '../types'

import { pool } from '../db'

export const getSubmission = async (submission_id: string) => {
  const submission = await pool.query<TD.DBSubmission>(
    `
    SELECT * FROM submissions
    WHERE id = $1
    `,
    [submission_id],
  )

  return submission.rows[0]
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
