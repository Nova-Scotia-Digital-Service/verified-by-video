import * as TD from '../types'

import { pool } from '../db'
import { unpopulateDb, populateDb } from '../../test/testUtils'

import { SessionController } from './SessionController'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

beforeAll(async () => {
  await populateDb()
})

afterAll(async () => {
  await unpopulateDb()
  await pool.end()
})

describe('SessionController', () => {
  describe('createSession', () => {
    it('returns a new session', async () => {
      const newSession = await new SessionController().createSession()

      const expectedPrompts: TD.Prompt[] = [
        { id: expect.stringMatching(UUID_REGEX), text: expect.any(String), type: 'text' },
        { id: expect.stringMatching(UUID_REGEX), text: expect.any(String), type: 'text' },
        { id: expect.stringMatching(UUID_REGEX), text: expect.any(String), type: 'text' },
      ]

      expect(newSession.id).toMatch(UUID_REGEX)
      expect(newSession.created_at).toBeInstanceOf(Date)
      expect(newSession.expires_at).toBeInstanceOf(Date)
      expect(newSession.version).toBe('1')
      expect(newSession.prompts).toHaveLength(3)
      expect(newSession.prompts).toStrictEqual(expectedPrompts)
    })
  })
})
