import { JestConfigWithTsJest } from 'ts-jest'

import { TEST_DB_NAME, TEST_BUCKET_NAME, getPgClient, destroyMinioBucket } from './testUtils'

export default async (globalConfig: JestConfigWithTsJest, projectConfig: JestConfigWithTsJest) => {
  console.log(`Destroying test database ("${TEST_DB_NAME}")...`)
  const client = getPgClient('postgres')
  await client.connect()
  await client.query(`DROP DATABASE "${TEST_DB_NAME}"`)
  await client.end()
  console.log('...test database destroyed.')

  console.log(`Destroying MinIO test bucket ("${TEST_BUCKET_NAME}")...`)
  await destroyMinioBucket(TEST_BUCKET_NAME)
  console.log('...test bucket destroyed.')
}
