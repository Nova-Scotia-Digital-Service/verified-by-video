import { Client } from 'minio'

import config from './config'

export const minioClient = new Client({
  endPoint: config.MINIO_HOST,
  port: parseInt(config.MINIO_PORT),
  useSSL: config.NODE_ENV !== 'development', // only disable ssl for local dev
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_ACCESS_KEY,
})

export const signMinioUrl = async (unsignedUrl: string) => {
  let signedUrl = await minioClient.presignedGetObject(config.S3_BUCKET_NAME, unsignedUrl, 60 * 60)
  // if (config.MINIO_HOST && config.MINIO_HOST.trim() !== '') {
  if (config.NODE_ENV === 'development') {
    if (config.MINIO_HOST_URL && config.MINIO_HOST_URL.trim() !== '') {
      signedUrl = signedUrl.replace('http://minio:9000', `${config.MINIO_HOST_URL}`)
    } else {
      signedUrl = signedUrl.replace('http://minio:9000', 'http://localhost:9002')
    }
  }

  return signedUrl
}
