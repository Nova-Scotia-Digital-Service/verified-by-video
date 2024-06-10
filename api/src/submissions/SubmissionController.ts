import * as TD from '../types'

import {
  Get,
  Controller,
  Param,
  Post,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common'

import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiProperty } from '@nestjs/swagger'
import { v4 as uuid } from 'uuid'

import { createSubmission, getSubmission } from './SubmissionData'

import config from '../config'
import { minioClient } from '../minio'

class SubmissionDto {
  @ApiProperty({ type: 'string' })
  sessionId!: string

  @ApiProperty({ type: 'string', format: 'binary' })
  file!: Express.Multer.File
}

@Controller('/submissions')
export class SubmissionController {
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async createSubmission(
    @Body() { sessionId: session_id }: SubmissionDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<TD.Submission> {
    const fileNameComponents = file.originalname.split('.')
    const fileExtension = fileNameComponents[fileNameComponents.length - 1]
    const randomizedFileName = `${uuid()}.${fileExtension}`
    const filePath = `media/${randomizedFileName}`

    await minioClient.putObject(config.S3_BUCKET_NAME, filePath, file.buffer, file.size)

    return await createSubmission(session_id, filePath)
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
