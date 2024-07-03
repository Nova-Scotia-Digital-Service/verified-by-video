import * as TD from '../../types'

import { Get, Controller, UseGuards, Post, Body, Delete, Param } from '@nestjs/common'
import { ApiProperty, ApiBearerAuth as SwaggerRequireAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth/AuthGuard'

import { createTag, deleteTag, getTagList } from './TagData'

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
  public async createTag(@Body() { text }: TagBodySchema): Promise<TD.Tag> {
    return await createTag(text)
  }

  @UseGuards(AuthGuard)
  @SwaggerRequireAuth()
  @Delete('/:tag_id')
  public async deleteTag(@Param('tag_id') tag_id: string): Promise<void> {
    await deleteTag(tag_id)
  }
}
