import * as TD from '../../../types'

import { createSlice } from '@reduxjs/toolkit'

import { createTag, deleteTag, getTags } from './tagThunks'

const tagSlice = createSlice({
  name: 'tags',
  initialState: null as TD.APIResponse<TD.Tag[]> | null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state, action) => {
      return { status: 'LOADING' }
    })
    builder.addCase(getTags.rejected, (state, action) => {
      return { status: 'ERROR', error: action.error }
    })
    builder.addCase(getTags.fulfilled, (state, { payload: tags }) => {
      return { status: 'READY', data: tags }
    })
    builder.addCase(deleteTag.pending, (state, action) => {})
    builder.addCase(deleteTag.rejected, (state, action) => {
      return { status: 'ERROR', error: action.error }
    })
    builder.addCase(deleteTag.fulfilled, (state, { payload: tagId }) => {
      if (!state || !(state.status === 'READY')) throw new Error('Unreachable')

      const filteredTags = state.data.filter((tag) => tag.id !== tagId)
      return { status: 'READY', data: filteredTags }
    })
    builder.addCase(createTag.pending, (state, action) => {})
    builder.addCase(createTag.rejected, (state, action) => {
      return { status: 'ERROR', error: action.error }
    })
    builder.addCase(createTag.fulfilled, (state, { payload: newTag }) => {
      if (!state || !(state.status === 'READY')) throw new Error('Unreachable')

      return { status: 'READY', data: [...state.data, newTag] }
    })
  },
})

export const tagReducer = tagSlice.reducer
export const tagActions = tagSlice.actions
