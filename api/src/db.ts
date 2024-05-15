import pg from 'pg'

import config from './config'

export const pgClient = () =>
  new pg.Client({
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    host: config.PG_HOST,
    database: config.PG_DATABASE,
  })
