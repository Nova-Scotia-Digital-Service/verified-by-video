import { pool } from '../../db'
import { unpopulateDb, populateDb } from '../../../test/testUtils'

import { AgentController } from './AgentController'

const SIGNED_URL_REGEX = /^https?\:\/\/.*Amz-Signature=[0-9a-z]{64}$/

beforeAll(async () => {
  await populateDb()
})

afterAll(async () => {
  await unpopulateDb()
  await pool.end()
})

// replace variable signed urls in snapshot with constant string
expect.addSnapshotSerializer({
  serialize: () => 'Any<SignedURL>',
  test: (val) => val && typeof val === 'string' && SIGNED_URL_REGEX.test(val),
})

describe('AgentController', () => {
  describe('drpcRequest', () => {
    it('accepts data', async () => {
      await new AgentController().drpcRequest({
        id: Math.floor(Math.random() * 1000000),
        jsonrpc: '',
        connection_id: '33abaab8-0a6f-477f-815a-eb0529b1ba3a',
        thread_id: '4233b4fe-1690-4c4e-b6d7-06b3be941be0',
        request: {
          request: {
            method: '',
          },
        },
      })
    })
  })
})
