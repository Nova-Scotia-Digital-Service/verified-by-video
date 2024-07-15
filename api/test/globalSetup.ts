import { JestConfigWithTsJest } from 'ts-jest'

import { getPgClient, TEST_DB_NAME, TEST_BUCKET_NAME, minioClient, destroyMinioBucket, promptYesNo } from './testUtils'

const TERM_YELLOW = '\u001b[33m'
const TERM_RESET = '\u001b[0m'

export default async (globalConfig: JestConfigWithTsJest, projectConfig: JestConfigWithTsJest) => {
  const isCI = process.env.CI === 'true'

  const pgAdminClient = getPgClient('postgres')
  await pgAdminClient.connect()

  const dbExists = await pgAdminClient.query(`SELECT true FROM pg_database WHERE datname = $1`, [TEST_DB_NAME])
  if (dbExists.rows.length > 0) {
    if (!isCI) {
      const deleteDb = await promptYesNo(
        `\n${TERM_YELLOW}Warning!${TERM_RESET} Database "${TEST_DB_NAME}" already exists! Delete [y/N]? `,
      )

      if (deleteDb) {
        await pgAdminClient.query(`DROP DATABASE "${TEST_DB_NAME}"`)
        console.log('...test database destroyed...')
        process.exit(1)
      }
    }

    throw new Error(`Database ${TEST_DB_NAME} already exists. Aborting tests.`)
  }

  const bucketExists = (await minioClient.listBuckets()).some(({ name }) => name === TEST_BUCKET_NAME)
  if (bucketExists) {
    if (!isCI) {
      const deleteBucket = await promptYesNo(
        `\n${TERM_YELLOW}Warning!${TERM_RESET} Bucket "${TEST_BUCKET_NAME}" already exists! Delete [y/N]? `,
      )

      if (deleteBucket) {
        await destroyMinioBucket(TEST_BUCKET_NAME)
        console.log('...test bucket destroyed...')
        process.exit(1)
      }
    }

    throw new Error(`Bucket ${TEST_BUCKET_NAME} already exists. Aborting tests.`)
  }

  console.log(`\nCreating test database ("${TEST_DB_NAME}")...`)
  await pgAdminClient.query(`CREATE DATABASE "${TEST_DB_NAME}"`)
  await pgAdminClient.end()
  console.log('...test database created.')

  console.log(`Creating MinIO test bucket ("${TEST_BUCKET_NAME}")...`)
  await minioClient.makeBucket(TEST_BUCKET_NAME)
  console.log('...test bucket created.')

  process.env.PG_DATABASE = TEST_DB_NAME
  process.env.S3_BUCKET_NAME = TEST_BUCKET_NAME
}
