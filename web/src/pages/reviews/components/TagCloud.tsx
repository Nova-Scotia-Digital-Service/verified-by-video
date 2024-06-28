import { useState } from 'react'
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
        {tags.length > 0 ? (
          tags.sort().map((tag) => {
            return (
              <div key={tag} className="inline-block px-2 py-0.5 bg-slate text-sm rounded">
                {tag}
              </div>
            )
          })
        ) : (
          <div className="text-slate">No tags</div>
        )}
      </button>
      {modalOpen && <TagDropdown reviewId={reviewId} tags={tags} setTags={setTags} close={() => setModalOpen(false)} />}
    </div>
  )
}
