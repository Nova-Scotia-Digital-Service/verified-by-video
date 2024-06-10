export const s3Host = process.env.S3_HOST ?? 'http://localhost:9000'
export const s3BucketName = process.env.S3_BUCKET_NAME ?? 'verified-by-video'
export const s3BucketBaseUrl = `${s3Host}/${s3BucketName}/`

export const backendHost = process.env.BACKEND_HOST ?? 'http://localhost:3100'
export const apiBaseUrl = `${backendHost}/api/v1/staff`
