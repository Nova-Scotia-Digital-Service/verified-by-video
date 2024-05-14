import dotenv, { DotenvPopulateInput } from 'dotenv'

// default configuration settings
const config = {
  NODE_ENV: 'production', // assume production environment unless explicitly stated otherwise
  HOST: '0.0.0.0',
  PORT: '3100',
}

// override with settings from project root `.env` file
dotenv.config({ processEnv: config, path: '../.env', override: true })

// override with environment variables from process.env
dotenv.populate(config, process.env as DotenvPopulateInput, { override: true })

export default config
