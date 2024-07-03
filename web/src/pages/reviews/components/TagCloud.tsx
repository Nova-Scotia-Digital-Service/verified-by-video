import { useState } from 'react'

import { TagPill } from '../../../components/TagPill'

import { TagDropdown } from './TagDropdown'

type TagCloudProps = {
  reviewId: string
  tags: string[]
}

export const TagCloud: React.FC<TagCloudProps> = ({ reviewId, tags: initialTags }) => {
  const [tags, setTags] = useState(initialTags)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div className="relative">
      <button type="button" onClick={toggleModal} className="space-x-1">
        {tags.length === 0 && <div className="text-slate">No tags</div>}
        {tags.length > 0 && tags.sort().map((tag) => <TagPill key={tag} text={tag} />)}
      </button>
      {modalOpen && <TagDropdown reviewId={reviewId} tags={tags} setTags={setTags} close={() => setModalOpen(false)} />}
    </div>
  )
}
