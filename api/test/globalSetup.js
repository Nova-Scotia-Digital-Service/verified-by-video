const {
  prompt,
  getPgClient,
  TEST_DB_NAME,
  TEST_BUCKET_NAME,
  TERM_YELLOW,
  TERM_RESET,
  minioClient,
} = require('./testUtils')

module.exports = async function (globalConfig, projectConfig) {
  console.log(`\nCreating test database ("${TEST_DB_NAME}")...`)
  const pgAdminClient = getPgClient('postgres')
  await pgAdminClient.connect()

  const dbExists = await pgAdminClient.query(`SELECT true FROM pg_database WHERE datname = $1`, [TEST_DB_NAME])
  if (dbExists.rows.length > 0) {
    let deleteDb = false

    if (process.env.CI !== 'true') {
      const input = await prompt(
        `\n${TERM_YELLOW}Warning!${TERM_RESET} Database "${TEST_DB_NAME}" already exists! Delete [y/N]? `,
      )
      console.log('') // newline

      deleteDb = input.toLowerCase().startsWith('y')
    }

    if (deleteDb) {
      await pgAdminClient.query(`DROP DATABASE "${TEST_DB_NAME}"`)
      console.log('...test database destroyed...')
    } else {
      throw new Error(`Database ${TEST_DB_NAME} already exists. Aborting tests.`)
    }
  }

  await pgAdminClient.query(`CREATE DATABASE "${TEST_DB_NAME}"`)
  await pgAdminClient.end()
  console.log('...test database created.')

  console.log(`Creating MinIO test bucket ("${TEST_BUCKET_NAME}")...`)
  await minioClient.makeBucket(TEST_BUCKET_NAME)
  console.log('...test bucket created.')

  process.env.PG_DATABASE = TEST_DB_NAME
  process.env.S3_BUCKET_NAME = TEST_BUCKET_NAME
}
