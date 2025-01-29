import dotenv, { DotenvPopulateInput } from 'dotenv'

type Config = {
  NODE_ENV: string
  HOST: string
  PORT: string
  KEYCLOAK_ADDRESS: string
  PG_USER: string
  PG_PASSWORD: string
  PG_HOST: string
  PG_DATABASE: string
  MINIO_HOST: string
  MINIO_PORT: string
  MINIO_ACCESS_KEY: string
  MINIO_SECRET_ACCESS_KEY: string
  MINIO_HOST_URL: string
  S3_BUCKET_NAME: string
  NATS_ADDRESS: string
}

const REQUIRED_ENV_VARS = ['PG_PASSWORD', 'MINIO_ACCESS_KEY', 'MINIO_SECRET_ACCESS_KEY'] as const

// default configuration settings
const config: Omit<Config, (typeof REQUIRED_ENV_VARS)[number]> = {
  NODE_ENV: 'production', // assume production environment unless explicitly stated otherwise
  HOST: '0.0.0.0',
  KEYCLOAK_ADDRESS: 'http://keycloak:8080',
  PORT: '3100',
  PG_USER: 'postgres',
  PG_HOST: 'localhost',
  MINIO_HOST: 'minio',
  MINIO_PORT: '9000',
  MINIO_HOST_URL: 'http://localhost:9002',
  NATS_ADDRESS: 'nats://nats:4222',
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
