import * as TD from '../types'

import { pgClient } from '../db'

export const getSubmission = async (submission_id: string) => {
  const client = pgClient()
  await client.connect()
  const submission = await client.query<TD.DBSubmission>(
    `
    SELECT * FROM submissions
    WHERE id = $1
    `,
    [submission_id],
  )
  await client.end()

  return submission.rows[0]
}

export const createSubmission = async (session_id: string, video_url: string) => {
  const client = pgClient()
  await client.connect()
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
  await client.end()

  return createdSubmission.rows[0]
}
