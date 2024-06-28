import * as TD from '../types'

import { pool } from '../db'

export const prompts: TD.Prompt[] = [
  { id: '10125e01-642d-4be5-bf1c-2e0575091b23', text: 'Hold up two fingers', type: 'text' },
  { id: '8e579ca4-400f-4802-952a-54ae33e81799', text: 'Touch your ear', type: 'text' },
  { id: '870fbfb4-2bab-4a91-b5b3-0d16d7220353', text: 'Turn your head to the left', type: 'text' },
]

export const createSession = async () => {
  const client = await pool.connect()
  await client.query('BEGIN')
  const createdSession = await client.query<TD.DBSession>(`
    INSERT INTO sessions
    DEFAULT VALUES
    RETURNING *
  `)
  const createdPrompts = await client.query<TD.DBPrompt>(
    `
    INSERT INTO prompts (session_id, text)
    VALUES
      ($1, $2),
      ($1, $3),
      ($1, $4)
    RETURNING id, text
  `,
    [createdSession.rows[0].id, prompts[0].text, prompts[1].text, prompts[2].text],
  )
  await client.query('COMMIT')
  await client.release()

  if (createdSession.rows.length !== 1) throw new Error('Unexpected number of rows returned when creating session.')
  return {
    ...createdSession.rows[0],
    prompts: createdPrompts.rows,
  }
}
