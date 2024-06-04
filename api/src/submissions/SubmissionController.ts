import * as TD from '../types'

import { Get, Controller, Param, Post, HttpException, HttpStatus } from '@nestjs/common'

import { createSubmission, getSubmission } from './SubmissionData'

@Controller('/submissions')
export class SubmissionController {
  @Post('/')
  public async createSubmission(): Promise<TD.Submission> {
    // session_id from example-data.sql
    return await createSubmission('88acfa3d-bf2f-4cae-8746-60a9106f6d56', '/media/example-video.mp4')
  }

  @Get('/:submissionId')
  public async getSubmission(@Param('submissionId') submission_id: string): Promise<TD.Submission> {
    const submission = await getSubmission(submission_id)
    if (submission === undefined) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return submission
  }
}
