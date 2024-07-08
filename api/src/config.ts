import dotenv, { DotenvPopulateInput } from 'dotenv'

type Config = {
  NODE_ENV: string
  HOST: string
  PORT: string
  JWT_SECRET_KEY: string
  PG_USER: string
  PG_PASSWORD: string
  PG_HOST: string
  PG_DATABASE: string
  MINIO_ACCESS_KEY: string
  MINIO_SECRET_ACCESS_KEY: string
  S3_BUCKET_NAME: string
}

const REQUIRED_ENV_VARS = ['JWT_SECRET_KEY', 'PG_PASSWORD', 'MINIO_ACCESS_KEY', 'MINIO_SECRET_ACCESS_KEY'] as const

// default configuration settings
const config: Omit<Config, (typeof REQUIRED_ENV_VARS)[number]> = {
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

REQUIRED_ENV_VARS.forEach((key) => {
  if (!config[key]) {
    throw new Error(`Required environment variable ${key} not found.`)
  }
})

export default config as Config
