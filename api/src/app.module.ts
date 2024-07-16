import { Module } from '@nestjs/common'

import { ReviewController } from './staff/reviews/ReviewController'
import { SubmissionController } from './submissions/SubmissionController'
import { SessionController } from './sessions/SessionController'
import { TagController } from './staff/tags/TagController'

@Module({
  controllers: [ReviewController, SubmissionController, SessionController, TagController],
})
export class AppModule {}
