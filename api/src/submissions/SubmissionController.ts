import { Get, JsonController, Param, Post } from 'routing-controllers'
import { Service } from 'typedi'

import { mockSubmission } from './SubmissionData'

@JsonController('/submissions')
@Service()
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
