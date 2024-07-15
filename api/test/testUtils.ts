import fs from 'fs/promises'
import readline from 'node:readline/promises'

import { runner } from 'node-pg-migrate'
import * as minio from 'minio'
import * as pg from 'pg'

const MIGRATIONS_TABLE = 'pgmigrations'

export const TEST_DB_NAME = 'TEST_verified_by_video'
export const TEST_BUCKET_NAME = 'test-verified-by-video'

export const promptYesNo = async (msg) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const response = await rl.question(msg)
  console.log('') // newline
  rl.close()
  return response.toLowerCase().startsWith('y')
}

export const getPgClient = (database) =>
  new pg.Client({
    user: 'postgres',
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database,
  })

export const minioClient = new minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_ACCESS_KEY as string,
})

export const destroyMinioBucket = async (bucketName) => {
  const bucketObjects = await new Promise<string[]>((resolve, reject) => {
    const bucketObjects: string[] = []
    const stream = minioClient.listObjectsV2(bucketName, undefined, true)
    stream.on('data', (obj) => obj.name && bucketObjects.push(obj.name))
    stream.on('error', (error) => reject(error))
    stream.on('end', () => resolve(bucketObjects))
  })
  await minioClient.removeObjects(bucketName, bucketObjects)
  await minioClient.removeBucket(bucketName)
}

export const populateDb = async () => {
  const testDbClient = getPgClient(TEST_DB_NAME)
  await testDbClient.connect()

  await runner({
    migrationsTable: MIGRATIONS_TABLE,
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

export const unpopulateDb = async () => {
  const testDbClient = getPgClient(TEST_DB_NAME)
  await testDbClient.connect()
  await runner({
    migrationsTable: MIGRATIONS_TABLE,
    dbClient: testDbClient,
    dir: 'db/migrations',
    direction: 'down',
    count: Infinity,
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
