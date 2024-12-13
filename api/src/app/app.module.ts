import { Module } from '@nestjs/common'

import { ReviewController } from './reviews/ReviewController'
import { StaffSubmissionController, SubmissionController } from './submissions/SubmissionController'
import { SessionController } from './sessions/SessionController'
import { TagController } from './tags/TagController'
import { AgentController } from './agent/AgentController'

@Module({
  controllers: [
    ReviewController,
    SubmissionController,
    StaffSubmissionController,
    SessionController,
    TagController,
    AgentController,
  ],
})
export class AppModule {}
