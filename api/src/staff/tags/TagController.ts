import * as TD from '../../types'

import { Get, Controller, UseGuards, Post, Body } from '@nestjs/common'
import { ApiProperty, ApiBearerAuth as SwaggerRequireAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth/AuthGuard'

import { createTag, getTagList } from './TagData'

class TagBodySchema {
  @ApiProperty({ type: 'string' })
  text!: string
}

@Controller('/staff/tags')
export class TagController {
  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Get('/')
  public async getTagList(): Promise<TD.Tag[]> {
    return await getTagList()
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Post('/')
  public async createTag(@Body() { text }: TagBodySchema): Promise<void> {
    await createTag(text)
  }
}
