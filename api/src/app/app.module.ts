import { Module } from '@nestjs/common'

import { ReviewController } from './reviews/ReviewController'
import { SubmissionController } from './submissions/SubmissionController'
import { SessionController } from './sessions/SessionController'
import { TagController } from './tags/TagController'

@Module({
  controllers: [ReviewController, SubmissionController, SessionController, TagController],
})
export class AppModule {}
