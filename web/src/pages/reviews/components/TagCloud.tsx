import * as TD from '../../../types'

import { useEffect, useState, useRef } from 'react'

import { applySubmissionTag, removeSubmissionTag } from '../../../api/SubmissionApi'
import { getTagList } from '../../../api/TagApi'

import { useResponse } from '../../../hooks/useResponse'
import { useClickOutside } from '../../../hooks/useClickOutside'

import { AwaitResponse } from '../../../components/AwaitResponse'
import { TagPill } from '../../../components/TagPill'

type TagCloudProps = {
  submissionId: string
  tags: TD.Tag[]
}

type TagCloudDropdownProps = {
  submissionId: string
  selectedTags: TD.Tag[]
  setSelectedTags: (tags: TD.Tag[]) => void
  close: () => void
}

export const TagCloudDropdown: React.FC<TagCloudDropdownProps> = ({
  submissionId,
  selectedTags,
  setSelectedTags,
  close,
}) => {
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
    if (selectedTags.some((tag) => tag.id === tagToToggle.id)) {
      removeSubmissionTag(submissionId, tagToToggle.id).then((response) => {
        if (response.status === 200) {
          setSelectedTags(selectedTags.filter((tag) => tag.id !== tagToToggle.id))
        }
      })
    } else {
      applySubmissionTag(submissionId, tagToToggle.id).then((response) => {
        if (response.status === 201) {
          setSelectedTags([...selectedTags, tagToToggle])
        }
      })
    }
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute left-2 top-4 min-w-32 max-w-72 p-2 bg-background border rounded shadow-md z-10"
    >
      <div className="mb-2 font-bold">Tags</div>
      <AwaitResponse response={tagListResponse}>
        {(tagList) => (
          <div className="flex gap-2 flex-wrap">
            {tagList.map((tag) => {
              const isSelected = selectedTags.some(({ id }) => id === tag.id)

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

export const TagCloud: React.FC<TagCloudProps> = ({ submissionId, tags: initialTags }) => {
  const [tags, setTags] = useState(initialTags)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div className="relative">
      <button type="button" onClick={toggleModal} className="space-x-1">
        {tags.length === 0 && <div className="text-slate">No tags</div>}
        {tags.length > 0 && tags.map((tag) => <TagPill key={tag.id} text={tag.text} />)}
      </button>
      {modalOpen && (
        <TagCloudDropdown
          submissionId={submissionId}
          selectedTags={tags}
          setSelectedTags={setTags}
          close={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
