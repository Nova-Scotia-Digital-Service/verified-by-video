import dotenv, { DotenvPopulateInput } from 'dotenv'

interface Config {
  NODE_ENV: string
  HOST: string
  PORT: string
  PG_USER: string
  PG_PASSWORD: string
  PG_HOST: string
  PG_DATABASE: string
}

// default configuration settings
const config: Omit<Config, 'PG_PASSWORD'> = {
  NODE_ENV: 'production', // assume production environment unless explicitly stated otherwise
  HOST: '0.0.0.0',
  PORT: '3100',
  PG_USER: 'postgres',
  PG_HOST: 'localhost',
  PG_DATABASE: 'verified_by_video',
}

// override with settings from project root `.env` file
dotenv.config({ processEnv: config, path: '../.env', override: true })

// override with environment variables from process.env
dotenv.populate(config, process.env as DotenvPopulateInput, { override: true })

if (config['PG_PASSWORD'] === undefined) {
  throw new Error('Required environment variable PG_PASSWORD not found.')
}

export default config as Config
