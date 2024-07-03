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
    DELETE FROM review_tags
    WHERE
      review_tags.tag_id = $1`,
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
}

export const applyTagToReview = async (reviewId: string, tagId: string) => {
  await pool.query(
    `
    INSERT INTO review_tags
      (review_id, tag_id)
    VALUES
      ($1, $2)`,
    [reviewId, tagId],
  )
}

export const removeTagFromReview = async (reviewId: string, tagText: string) => {
  await pool.query(
    `
    DELETE FROM review_tags
    USING tags
    WHERE
      review_tags.review_id = $1 AND
      review_tags.tag_id = tags.id AND
      tags.text = $2`,
    [reviewId, tagText],
  )
}
