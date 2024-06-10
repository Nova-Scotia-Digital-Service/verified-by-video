import dotenv, { DotenvPopulateInput } from 'dotenv'

type Config = {
  NODE_ENV: string
  HOST: string
  PORT: string
  PG_USER: string
  PG_PASSWORD: string
  PG_HOST: string
  PG_DATABASE: string
  MINIO_ACCESS_KEY: string
  MINIO_SECRET_ACCESS_KEY: string
  S3_BUCKET_NAME: string
}

// default configuration settings
const config: Omit<Config, 'PG_PASSWORD' | 'MINIO_ACCESS_KEY' | 'MINIO_SECRET_ACCESS_KEY'> = {
  NODE_ENV: 'production', // assume production environment unless explicitly stated otherwise
  HOST: '0.0.0.0',
  PORT: '3100',
  PG_USER: 'postgres',
  PG_HOST: 'localhost',
  PG_DATABASE: 'verified_by_video',
  S3_BUCKET_NAME: 'verified-by-video',
}

// override with settings from project root `.env` file
dotenv.config({ processEnv: config, path: '../.env', override: true })

// override with environment variables from process.env
dotenv.populate(config, process.env as DotenvPopulateInput, { override: true })

if (!config['PG_PASSWORD']) {
  throw new Error('Required environment variable PG_PASSWORD not found.')
}

if (!config['MINIO_ACCESS_KEY'] || !config['MINIO_SECRET_ACCESS_KEY']) {
  throw new Error(
    'MinIO access keys not found. Please add enviroment variables MINIO_ACCESS_KEY and MINIO_SECRET_ACCESS_KEY.',
  )
}

export default config as Config
