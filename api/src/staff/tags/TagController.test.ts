import { pool } from '../../db'

import { TagController } from './TagController'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

// replace variable uuids in snapshot with constant string
expect.addSnapshotSerializer({
  serialize: () => 'Any<UUID>',
  test: (val) => val && typeof val === 'string' && UUID_REGEX.test(val),
})

describe('TagController', () => {
  describe('getTagList', () => {
    it('returns a list of tags', async () => {
      expect(await new TagController().getTagList()).toMatchSnapshot()
    })
  })

  describe('createTag', () => {
    it('adds a new tag to list of tags', async () => {
      await new TagController().createTag({ text: 'Some new tag' })
      expect(await new TagController().getTagList()).toMatchSnapshot()
    })
  })

  describe('deleteTag', () => {
    it('deletes a tag from the list of tags', async () => {
      const tagToDelete = { id: '1529c4ad-c5f7-404c-b880-6ffc9ad4ca1c', text: 'Tag 1' }

      const beforeList = await new TagController().getTagList()
      expect(beforeList).toContainEqual(tagToDelete)
      await new TagController().deleteTag('1529c4ad-c5f7-404c-b880-6ffc9ad4ca1c')
      const afterList = await new TagController().getTagList()
      expect(afterList).not.toContainEqual(tagToDelete)
    })
  })
})

afterAll(() => {
  pool.end()
})
