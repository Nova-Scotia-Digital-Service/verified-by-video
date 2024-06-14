const { TEST_DB_NAME, TEST_BUCKET_NAME, getPgClient, minioClient } = require('./testUtils')

module.exports = async function (globalConfig, projectConfig) {
  console.log(`Destroying test database ("${TEST_DB_NAME}")...`)
  const client = getPgClient('postgres')
  await client.connect()
  const createDb = await client.query(`DROP DATABASE "${TEST_DB_NAME}"`)
  await client.end()
  console.log('...test database destroyed.')

  console.log(`Destroying MinIO test bucket ("${TEST_BUCKET_NAME}")...`)
  const bucketObjects = []
  await new Promise((resolve, reject) => {
    const stream = minioClient.listObjectsV2(TEST_BUCKET_NAME, undefined, true)
    stream.on('data', (obj) => bucketObjects.push(obj.name))
    stream.on('error', (error) => reject(error))
    stream.on('end', () => resolve())
  })
  await minioClient.removeObjects(TEST_BUCKET_NAME, bucketObjects)
  await minioClient.removeBucket(TEST_BUCKET_NAME)
  console.log('...test bucket destroyed.')
}
