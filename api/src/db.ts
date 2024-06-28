import { Pool } from 'pg'

import config from './config'

export const pool = new Pool({
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
})
