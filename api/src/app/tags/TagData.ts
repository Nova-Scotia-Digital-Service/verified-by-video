import * as TD from '../../types'

import { pool } from '../../db'

export const getTagList = async () => {
  const tags = await pool.query<TD.DBTag>(`
    SELECT
      id, text
    FROM tags`)

  return tags.rows
}

export const createTag = async (text: string) => {
  const result = await pool.query(
    `
    INSERT INTO tags
      (text)
    VALUES
      ($1)
    RETURNING id, text`,
    [text],
  )

  return result.rows[0]
}

export const deleteTag = async (tagId: string) => {
  const client = await pool.connect()
  await client.query('BEGIN')
  await client.query(
    `
    DELETE FROM submission_tags
    WHERE
      submission_tags.tag_id = $1
    `,
    [tagId],
  )
  await client.query(
    `
    DELETE FROM tags
    WHERE
      tags.id = $1`,
    [tagId],
  )
  await client.query('COMMIT')
  await client.release()
}

export const applyTagToSubmission = async (submissionId: string, tagId: string) => {
  await pool.query(
    `
    INSERT INTO submission_tags
      (submission_id, tag_id)
    VALUES
      ($1, $2)
    `,
    [submissionId, tagId],
  )
}

export const removeTagFromSubmission = async (submissionId: string, tagId: string) => {
  await pool.query(
    `
    DELETE FROM submission_tags
    WHERE
      submission_tags.submission_id = $1 AND
      submission_tags.tag_id = $2
    `,
    [submissionId, tagId],
  )
}
