import { Module } from '@nestjs/common'

import { ReviewController } from './staff/reviews/ReviewController'
import { SubmissionController } from './submissions/SubmissionController'
import { SessionController } from './sessions/SessionController'
import { AuthController } from './staff/auth/AuthController'

@Module({
  controllers: [ReviewController, SubmissionController, SessionController, AuthController],
})
export class AppModule {}
