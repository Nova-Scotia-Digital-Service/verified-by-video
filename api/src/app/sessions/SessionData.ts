import * as TD from '../../types'

import { pool } from '../../db'
import { buildNestedPgParams } from '../../utils/buildPgParams'
import { getRandomFromArray } from '../../utils/random'

const prompts: string[] = [
  'Hold up one finger',
  'Hold up two fingers',
  'Hold up three fingers',
  'Touch your ear',
  'Touch your shoulder',
  'Touch your nose',
  'Turn your head to the left',
  'Turn your head to the right',
]

export const createSession = async () => {
  const client = await pool.connect()
  await client.query('BEGIN')
  const createdSession = await client.query<TD.DBSession>(`
    INSERT INTO sessions
    DEFAULT VALUES
    RETURNING *
  `)

  const sessionId = createdSession.rows[0].id

  const promptsForSession = getRandomFromArray(prompts, 3)
  const sessionPromptPairs = promptsForSession.map((prompt) => [sessionId, prompt])
  const createdPrompts = await client.query<TD.DBPrompt>(
    `
    INSERT INTO prompts (session_id, text)
    VALUES
      ${buildNestedPgParams(sessionPromptPairs)}
    RETURNING id, text
  `,
    sessionPromptPairs.flat(),
  )
  await client.query('COMMIT')
  await client.release()

  if (createdSession.rows.length !== 1) throw new Error('Unexpected number of rows returned when creating session.')
  return {
    ...createdSession.rows[0],
    prompts: createdPrompts.rows,
  }
}
