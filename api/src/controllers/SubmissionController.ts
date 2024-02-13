import { Get, JsonController, Param, Post } from 'routing-controllers'
import { Service } from 'typedi'

import { confirmSubmission, previousSubmission } from '../content/SubmissionData'

@JsonController('/submissions')
@Service()
export class SubmissionController {
  @Get('/') // TEMPORARY - for development
  @Post('/')
  public async postSubmissions() {
    return confirmSubmission
  }

  @Get('/:submissionId')
  public async getSubmission(@Param('submissionId') submission_id: string) {
    return {
      ...previousSubmission,
      id: submission_id,
    }
  }
}
