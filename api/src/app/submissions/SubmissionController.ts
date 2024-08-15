import * as TD from '../../types'

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

import config from '../../config'
import { minioClient } from '../../minio'

import { createPhotoID, createSubmission, getSubmission } from './SubmissionData'
import { createReview } from '../reviews/ReviewData'

class SubmissionBodySchema {
  @ApiProperty({ type: 'string' })
  sessionId!: string

  @ApiProperty({ type: 'string', format: 'binary' })
  video_file!: Express.Multer.File
}

class PhotoDto {
  @ApiProperty({ type: 'string' })
  sessionId!: string

  @ApiProperty({ type: 'string' })
  description!: string

  @ApiProperty({ type: 'string', format: 'binary' })
  photo_file!: Express.Multer.File
}

@Controller('/submissions')
export class SubmissionController {
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video_file'))
  public async createSubmission(
    @Body() { sessionId: session_id }: SubmissionBodySchema,
    @UploadedFile() video_file: Express.Multer.File,
  ): Promise<TD.Submission> {
    const fileNameComponents = video_file.originalname.split('.')
    const fileExtension = fileNameComponents[fileNameComponents.length - 1]
    const randomizedFileName = `${uuid()}.${fileExtension}`
    const filePath = `media/${randomizedFileName}`

    await minioClient.putObject(config.S3_BUCKET_NAME, filePath, video_file.buffer, video_file.size)

    const submission = await createSubmission(session_id, filePath)
    await createReview(submission.id)
    return submission
  }

  @Post('/photo')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo_file'))
  public async createPhotoID(
    @Body() { sessionId: session_id, description }: PhotoDto,
    @UploadedFile() photo_file: Express.Multer.File,
  ): Promise<TD.IdentificationCard> {
    const fileNameComponents = photo_file.originalname.split('.')
    const fileExtension = fileNameComponents[fileNameComponents.length - 1]
    const randomizedFileName = `${uuid()}.${fileExtension}`
    const filePath = `media/${randomizedFileName}`

    await minioClient.putObject(config.S3_BUCKET_NAME, filePath, photo_file.buffer, photo_file.size)

    return await createPhotoID(session_id, description, filePath)
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
