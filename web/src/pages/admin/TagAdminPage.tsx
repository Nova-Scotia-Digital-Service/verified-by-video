import * as TD from '../../types'

import { useEffect, useState } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { TrashIcon } from '@radix-ui/react-icons'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import * as tagThunks from '../../store/slices/tag/tagThunks'

import { AwaitResponse } from '../../components/AwaitResponse'

import { TagPill } from '../../components/TagPill'
import { Dialog } from '../../components/Dialog'
import { IconButton, PrimaryButton } from '../../components/Button'
import { Input } from '../../components/Input'

const AddTagDialog = () => {
  const dispatch = useAppDispatch()
  const [newTagName, setNewTagName] = useState('')

  const addTag = () => {
    dispatch(tagThunks.createTag(newTagName))
  }

  return (
    <Dialog title="Add Tag">
      <Input
        label="Tag name"
        value={newTagName}
        onChange={(event) => {
          setNewTagName(event.target.value)
        }}
      />

      <RadixDialog.Close asChild>
        <PrimaryButton onClick={addTag} disabled={newTagName.length === 0}>
          Add
        </PrimaryButton>
      </RadixDialog.Close>
    </Dialog>
  )
}

export const TagAdminPage = () => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((state) => state.tags)

  useEffect(() => {
    if (tags === null) {
      dispatch(tagThunks.getTags())
    }
  }, [tags])

  const removeTag = (tag: TD.Tag) => () => {
    dispatch(tagThunks.deleteTag(tag.id))
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mt-12 mb-6">Admin</h1>
      <h2 className="text-2xl font-bold mb-6">Tags</h2>

      <div>
        {tags && (
          <AwaitResponse response={tags}>
            {(tagList) => (
              <div className="flex flex-col gap-2 items-start">
                {tagList.map((tag) => (
                  <div key={tag.id} className="flex gap-2 items-center">
                    <TagPill text={tag.text} />
                    <IconButton onClick={removeTag(tag)}>
                      <TrashIcon />
                    </IconButton>
                  </div>
                ))}
                <AddTagDialog />
              </div>
            )}
          </AwaitResponse>
        )}
      </div>
    </div>
  )
}
