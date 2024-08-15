import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import config from './config'

import { AppModule } from './app/app.module'

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
  const app = await NestFactory.create(AppModule, { cors: true })
  app.setGlobalPrefix('/api/v1')

  if (config.NODE_ENV === 'development') {
    const swaggerConfig = new DocumentBuilder().addBearerAuth().setTitle('Verified by Video').setVersion('0.1').build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api/v1', app, document)
  }

  await app.listen(config.PORT, config.HOST, () => {
    console.log(`Server running on: ${config.HOST}:${config.PORT}`)
  })
}

run()
