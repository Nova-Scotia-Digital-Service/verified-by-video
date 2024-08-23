import { Pool, PoolClient } from 'pg'

import config from './config'

export const pool = new Pool({
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
})

export const transaction = async <T>(callback: (client: PoolClient) => Promise<T>) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')

    return result
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    await client.release()
  }
}
