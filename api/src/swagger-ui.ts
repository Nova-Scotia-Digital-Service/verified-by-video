import { Express } from 'express'
import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUi from 'swagger-ui-express'

export const setupSwaggerRoutes = (app: Express, routingConfig) => {
  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, routingConfig)

  app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(spec))
}
