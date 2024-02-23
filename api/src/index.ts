import 'reflect-metadata'
import type { Express } from 'express'

import { json } from 'express'
import { Action, RoutingControllersOptions, createExpressServer } from 'routing-controllers'

import config from './config'
import { setupSwaggerRoutes } from './swagger-ui'

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
  const routingConfig: RoutingControllersOptions = {
    controllers: [__dirname + '/**/*Controller.ts', __dirname + '/**/*Controller.js'],
    cors: true,
    routePrefix: '/api/v1',
    authorizationChecker: async (action: Action, roles: string[]) => {
      const token = action.request.headers['authorization']
      return !!token
    },
  }

  const app: Express = createExpressServer(routingConfig)

  if (config.get('environment') === 'development') {
    setupSwaggerRoutes(app, routingConfig)
  }

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
