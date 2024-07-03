import * as TD from '../../../types'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import * as tagThunks from '../../../store/slices/tag/tagThunks'

import { AwaitResponse } from '../../../components/AwaitResponse'

import { TagPill } from '../../../components/TagPill'

type TagFilterProps = { filteredTags: string[]; setFilteredTags: (tags: string[]) => void }

export const TagFilter: React.FC<TagFilterProps> = ({ filteredTags, setFilteredTags }) => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((store) => store.tags)

  useEffect(() => {
    if (tags === null) {
      dispatch(tagThunks.getTags())
    }
  }, [tags])

  const toggleTag = (tagToToggle: TD.Tag) => {
    if (filteredTags.includes(tagToToggle.text)) {
      setFilteredTags(filteredTags.filter((tag) => tagToToggle.text !== tag))
    } else {
      setFilteredTags([...filteredTags, tagToToggle.text])
    }
  }

  return (
    tags && (
      <AwaitResponse response={tags}>
        {(tagList) => (
          <div className="flex gap-2 flex-wrap mb-4">
            Filter by tags:
            {tagList.map((tag) => {
              const isSelected = filteredTags.includes(tag.text)

              return (
                <button type="button" key={tag.id} onClick={() => toggleTag(tag)}>
                  <TagPill text={tag.text} isActive={isSelected} />
                </button>
              )
            })}
            {filteredTags.length > 0 && (
              <button type="button" onClick={() => setFilteredTags([])}>
                [clear]
              </button>
            )}
          </div>
        )}
      </AwaitResponse>
    )
  )
}
