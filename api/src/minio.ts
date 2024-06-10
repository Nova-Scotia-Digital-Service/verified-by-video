import { Client } from 'minio'

import config from './config'

export const minioClient = new Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: config.NODE_ENV !== 'development', // only disable ssl for local dev
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_ACCESS_KEY,
})
