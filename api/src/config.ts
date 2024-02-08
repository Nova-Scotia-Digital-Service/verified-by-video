import dotenv from 'dotenv'
import nconf from 'nconf'

const env = process.env.NODE_ENV ?? 'development'

if (env === 'development') {
  dotenv.config()
}

/**
 * These settings may contain sensitive information and should not be
 * stored in the repo. They are extracted from environment variables
 * and added to the config.
 */

// overrides are always as defined
nconf.overrides({
  environment: env,
  host: process.env.HOST ?? '0.0.0.0',
  port: process.env.PORT ?? 3100,
})

// load other properties from file.
nconf.argv().env()

// if nothing else is set, use defaults. This will be set if
// they do not exist in overrides or the config file.
nconf.defaults({
  appUrl: process.env.APP_URL ?? 'http://localhost:3100',
})

export default nconf
