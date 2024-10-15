import * as TD from '../../../types'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import * as tagThunks from '../../../store/slices/tag/tagThunks'

import { AwaitResponse } from '../../../components/AwaitResponse'

import { TagPill } from '../../../components/TagPill'

type TagFilterIndicatorProps = { filteredTagIds: string[]; setFilteredTagIds: (tags: string[]) => void }

export const TagFilterIndicator: React.FC<TagFilterIndicatorProps> = ({ filteredTagIds, setFilteredTagIds }) => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((store) => store.tags)

  useEffect(() => {
    if (tags === null) {
      dispatch(tagThunks.getTags())
    }
  }, [tags])

  const toggleTag = (tagToToggle: TD.Tag) => {
    if (filteredTagIds.includes(tagToToggle.id)) {
      setFilteredTagIds(filteredTagIds.filter((tagId) => tagToToggle.id !== tagId))
    } else {
      setFilteredTagIds([...filteredTagIds, tagToToggle.id])
    }
  }

  return (
    tags && (
      <AwaitResponse response={tags}>
        {(tagList) => (
          <div className="flex gap-2 flex-wrap mb-4">
            {tagList.map((tag) => {
              const isSelected = filteredTagIds.includes(tag.id)

              if (isSelected) {
                return (
                  <button type="button" key={tag.id} onClick={() => toggleTag(tag)}>
                    <TagPill text={`${tag.text}`} showCloseIcon />
                  </button>
                )
              }
            })}
            {filteredTagIds.length > 0 && (
              <button
                type="button"
                className="inline-block px-4 leading-snug rounded-full outline outline-1 outline-outline font-bold"
                onClick={() => setFilteredTagIds([])}
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </AwaitResponse>
    )
  )
}
