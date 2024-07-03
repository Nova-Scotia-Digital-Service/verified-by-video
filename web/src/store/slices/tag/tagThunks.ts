import * as TD from '../../../types'

import { createAsyncThunk } from '@reduxjs/toolkit'

import * as tagApi from '../../../api/TagApi'

export const getTags = createAsyncThunk('tags/getTags', async (): Promise<TD.Tag[]> => {
  const tagListResponse = await tagApi.getTagList()
  return tagListResponse.data
})

export const createTag = createAsyncThunk('tags/createTag', async (tagName: string): Promise<TD.Tag> => {
  const newTag = await tagApi.postTag(tagName)
  return newTag.data
})

export const deleteTag = createAsyncThunk('tags/deleteTag', async (tagId: string) => {
  await tagApi.deleteTag(tagId)
  return tagId
})
