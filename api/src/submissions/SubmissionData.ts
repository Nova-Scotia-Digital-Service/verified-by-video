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
  const client = await pool.connect()
  await client.query('BEGIN')
  const createdSubmission = await client.query<TD.DBSubmission>(
    `
    INSERT INTO submissions (session_id, video_url)
    VALUES
      ($1, $2)
    RETURNING *
  `,
    [session_id, video_url],
  )
  await client.query(
    `
    INSERT INTO reviews (submission_id) VALUES ($1)
  `,
    [createdSubmission.rows[0].id],
  )
  await client.query('COMMIT')
  await client.release()

  return createdSubmission.rows[0]
}

export const createPhotoID = async (session_id: string, description: string, photo_url: string) => {
  const client = pgClient()
  await client.connect()
  const createdPhotoID = await client.query<TD.DBIdentificationCard>(
    `
    INSERT INTO identification_cards (session_id, description, photo_url)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `,
    [session_id, description, photo_url],
  )
  await client.end()

  return createdPhotoID.rows[0]
}
