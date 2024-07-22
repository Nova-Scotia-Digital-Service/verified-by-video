import { buildNestedPgParams, buildPgParams } from './buildPgParams'

describe('utils', () => {
  describe('buildPgParams', () => {
    it('requires an input value', async () => {
      expect(() => buildPgParams([])).toThrow('Input required')
    })

    it('rejects irregular-shaped input values', async () => {
      expect(() => buildPgParams(['string', 123, null, {}])).toThrow('Value types differ')
    })

    it('generates param strings from flat arrays of values', async () => {
      expect(buildPgParams([''])).toBe('($1)')
      expect(buildPgParams(['', ''])).toBe('($1), ($2)')
      expect(buildPgParams(['', '', ''])).toBe('($1), ($2), ($3)')
      expect(buildPgParams(['string_a', 'string_b', 'string_c'])).toBe('($1), ($2), ($3)')
    })
  })

  describe('buildNestedPgParams', () => {
    it('requires an input value', async () => {
      expect(() => buildNestedPgParams([])).toThrow('Input required')
      expect(() => buildNestedPgParams([[], []])).toThrow('Input required')
    })

    it('rejects irregular-shaped input values', async () => {
      expect(() => buildNestedPgParams([['', ''], ['']])).toThrow('Row lengths do not match')
      expect(() => buildNestedPgParams([[''], ['', '']])).toThrow('Row lengths do not match')
      expect(() => buildNestedPgParams([[''], [''], ['', '']])).toThrow('Row lengths do not match')
    })

    it('generates param strings from nested arrays of values', async () => {
      expect(buildNestedPgParams([['']])).toBe('($1)')
      expect(buildNestedPgParams([['', '']])).toBe('($1, $2)')
      expect(buildNestedPgParams([['', '', '']])).toBe('($1, $2, $3)')
      expect(buildNestedPgParams([[''], ['']])).toBe('($1), ($2)')
      expect(buildNestedPgParams([[''], [''], ['']])).toBe('($1), ($2), ($3)')
      expect(
        buildNestedPgParams([
          ['', ''],
          ['', ''],
          ['', ''],
        ]),
      ).toBe('($1, $2), ($3, $4), ($5, $6)')
      expect(
        buildNestedPgParams([
          ['string', 123],
          [[null], {}],
        ]),
      ).toBe('($1, $2), ($3, $4)')
    })
  })
})
