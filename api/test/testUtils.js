const fs = require('fs/promises')
const readline = require('node:readline/promises')

const { runner } = require('node-pg-migrate')
const minio = require('minio')
const pg = require('pg')

const TERM_YELLOW = '\u001b[33m'
const TERM_RESET = '\u001b[0m'

const TEST_DB_NAME = 'TEST_verified_by_video'
const TEST_BUCKET_NAME = 'test-verified-by-video'

const prompt = async (msg) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const response = await rl.question(msg)
  return response
}

const getPgClient = (database) =>
  new pg.Client({
    user: 'postgres',
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database,
  })

const minioClient = new minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_ACCESS_KEY,
})

const populateDb = async (pool) => {
  const testDbClient = getPgClient(TEST_DB_NAME)
  await testDbClient.connect()
  await runner({
    dbClient: testDbClient,
    dir: 'db/migrations',
    direction: 'up',
    logger: {
      debug: () => {},
      info: () => {},
      warn: console.warn,
      error: console.error,
    },
    noLock: true,
  })

  const data = await fs.readFile('fixtures/example-data.sql', { encoding: 'utf-8' })
  await testDbClient.query(data)
  await testDbClient.end()
}

const unpopulateDb = async () => {
  const testDbClient = getPgClient(TEST_DB_NAME)
  await testDbClient.connect()
  await runner({
    dbClient: testDbClient,
    dir: 'db/migrations',
    direction: 'down',
    count: 999,
    logger: {
      debug: () => {},
      info: () => {},
      warn: console.warn,
      error: console.error,
    },
    noLock: true,
  })
  await testDbClient.end()
}

module.exports = {
  TERM_YELLOW,
  TERM_RESET,
  TEST_DB_NAME,
  TEST_BUCKET_NAME,
  prompt,
  getPgClient,
  minioClient,
  populateDb,
  unpopulateDb,
}
