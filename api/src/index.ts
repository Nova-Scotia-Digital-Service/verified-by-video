import 'reflect-metadata'
import type { Express } from 'express'

import { json } from 'express'
import { createExpressServer } from 'routing-controllers'

import config from './config'

process.on('unhandledRejection', (error) => {
  if (error instanceof Error) {
    console.error(`Unhandled promise rejection: ${error.message}`, { error })
  } else {
    console.error('Unhandled promise rejection due to non-error error', {
      error,
    })
  }
})

const run = async () => {
  const app: Express = createExpressServer({
    controllers: [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js'],
    cors: true,
    routePrefix: '/api/v1',
  })

  app.use(json())

  app.get('/', async (req, res) => {
    res.send('ok')
    return res
  })

  app.listen(config.get('port'), config.get('host'), () => {
    console.log(`Server running on: ${config.get('host')}:${config.get('port')}`)
  })
}

run()
