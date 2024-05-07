import { Get, Controller, Param, Post } from '@nestjs/common'

import { mockSubmission } from './SubmissionData'

@Controller('/submissions')
export class SubmissionController {
  @Post('/')
  public async postSubmissions() {
    return mockSubmission
  }

  @Get('/:submissionId')
  public async getSubmission(@Param('submissionId') submission_id: string) {
    return {
      ...mockSubmission,
      id: submission_id,
    }
  }
}
