import * as TD from '../../../types'

import { useEffect, useRef } from 'react'

import { applyReviewTag, removeReviewTag } from '../../../api/ReviewApi'
import { getTagList } from '../../../api/TagApi'

import { useResponse } from '../../../hooks/useResponse'
import { useClickOutside } from '../../../hooks/useClickOutside'

import { AwaitResponse } from '../../../components/AwaitResponse'
import { TagPill } from '../../../components/TagPill'

type TagDropdownProps = {
  reviewId: string
  tags: string[]
  setTags: (tags: string[]) => void
  close: () => void
}

export const TagDropdown: React.FC<TagDropdownProps> = ({ reviewId, tags, setTags, close }) => {
  const dropdownRef = useRef(null)
  const [tagListResponse, setTagListResponse] = useResponse<TD.Tag[]>()

  useEffect(() => {
    getTagList()
      .then((response) => {
        setTagListResponse({ status: 'READY', data: response.data })
      })
      .catch((error) => {
        setTagListResponse({ status: 'ERROR', error: error })
      })
  }, [])

  useClickOutside(dropdownRef, close)

  const toggleTag = (tagToToggle: TD.Tag) => {
    if (tags.includes(tagToToggle.text)) {
      removeReviewTag(reviewId, tagToToggle.text).then((response) => {
        if (response.status === 200) {
          setTags(tags.filter((tag) => tag !== tagToToggle.text))
        }
      })
    } else {
      applyReviewTag(reviewId, tagToToggle.id).then((response) => {
        if (response.status === 201) {
          setTags([...tags, tagToToggle.text])
        }
      })
    }
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute left-2 top-4 min-w-32 max-w-72 p-2 bg-background border rounded shadow-md"
    >
      <div className="mb-2 font-bold">Tags</div>
      <AwaitResponse response={tagListResponse}>
        {(tagList) => (
          <div className="flex gap-2 flex-wrap">
            {tagList.map((tag) => {
              const isSelected = tags.includes(tag.text)

              return (
                <button type="button" key={tag.id} onClick={() => toggleTag(tag)}>
                  <TagPill text={tag.text} isActive={isSelected} />
                </button>
              )
            })}
          </div>
        )}
      </AwaitResponse>
    </div>
  )
}
