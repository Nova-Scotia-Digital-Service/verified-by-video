const readline = require('node:readline/promises')

const minio = require('minio')
const pg = require('pg')

const TERM_YELLOW = '\u001b[33m'
const TERM_RESET = '\u001b[0m'

const TEST_DB_NAME = 'TEST_verified_by_video'
const TEST_BUCKET_NAME = 'test-verified-by-video'

const prompt = async (msg) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const response = await rl.question(msg)
  rl.close()
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

module.exports = { TERM_YELLOW, TERM_RESET, TEST_DB_NAME, TEST_BUCKET_NAME, prompt, getPgClient, minioClient }
