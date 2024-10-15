import * as TD from '../../../types'

import { useEffect } from 'react'
import * as RadixDropdown from '@radix-ui/react-dropdown-menu'

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import * as tagThunks from '../../../store/slices/tag/tagThunks'

import { AwaitResponse } from '../../../components/AwaitResponse'

import { ReactComponent as ChevronDown } from '../../../assets/chevron-down.svg'
import { ReactComponent as CheckboxCircle } from '../../../assets/checkbox-circle.svg'

type TagFilterDropdownProps = { filteredTagIds: string[]; setFilteredTagIds: (tags: string[]) => void }

export const TagFilterDropdown: React.FC<TagFilterDropdownProps> = ({ filteredTagIds, setFilteredTagIds }) => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((store) => store.tags)

  useEffect(() => {
    if (tags === null) {
      dispatch(tagThunks.getTags())
    }
  }, [tags])

  const toggleTag = (tagToToggle: TD.Tag) => (event: Event) => {
    event.preventDefault()

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
          <div className="flex gap-2 flex-wrap mb-4 items-center">
            <div className="font-bold mr-4">Filter By:</div>

            <RadixDropdown.Root>
              <RadixDropdown.Trigger className="flex items-center px-6 py-2 gap-4 border border-outline rounded-sm">
                <div className="font-bold">{filteredTagIds.length === 0 ? 'All' : '...'}</div>
                <ChevronDown />
              </RadixDropdown.Trigger>
              <RadixDropdown.Portal>
                <RadixDropdown.Content align="end" className="mt-2 border border-outline">
                  {tagList.map((tag) => {
                    const isSelected = filteredTagIds.includes(tag.id)

                    return (
                      <RadixDropdown.Item
                        key={tag.id}
                        className="flex items-center justify-between min-w-36 p-2 pl-4 font-bold hover:bg-off-white"
                        onSelect={toggleTag(tag)}
                      >
                        <div>{tag.text}</div> {isSelected && <CheckboxCircle className="ml-4" />}
                      </RadixDropdown.Item>
                    )
                  })}
                </RadixDropdown.Content>
              </RadixDropdown.Portal>
            </RadixDropdown.Root>
          </div>
        )}
      </AwaitResponse>
    )
  )
}
