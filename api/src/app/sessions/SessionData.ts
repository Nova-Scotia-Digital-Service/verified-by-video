import { transaction } from '../../db'
import { buildNestedPgParams } from '../../utils/buildPgParams'
import { getRandomFromArray } from '../../utils/random'

export const createSession = async () => {
  return transaction(async (client) => {
    const createdSession = await client.query<{
      id: string
      created_at: Date
      expires_at: Date
    }>(
      `
      INSERT INTO sessions
      DEFAULT VALUES
      RETURNING
        id,
        created_at,
        expires_at
      `,
    )

    const sessionId = createdSession.rows[0].id
    const prompts = await client.query<{
      text: string
    }>(`SELECT * FROM prompts_list`)

    const promptsForSession = getRandomFromArray(prompts.rows, 3)
    const sessionPromptPairs = promptsForSession.map((prompt) => [sessionId, prompt])
    const createdPrompts = await client.query<{ id: string; text: string }>(
      `
      INSERT INTO prompts (session_id, text)
      VALUES
        ${buildNestedPgParams(sessionPromptPairs)}
      RETURNING
        id,
        text
      `,
      sessionPromptPairs.flat(),
    )

    if (createdSession.rows.length !== 1) throw new Error('Unexpected number of rows returned when creating session.')

    return {
      ...createdSession.rows[0],
      prompts: createdPrompts.rows,
    }
  })
}
