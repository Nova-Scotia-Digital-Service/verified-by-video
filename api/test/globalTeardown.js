const { TEST_DB_NAME, TEST_BUCKET_NAME, getPgClient, minioClient, destroyMinioBucket } = require('./testUtils')

module.exports = async function (globalConfig, projectConfig) {
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
