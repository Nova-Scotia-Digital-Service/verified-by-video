import { getRandomFromArray } from './random'

describe('utils', () => {
  describe('getRandomFromArray', () => {
    it('returns results', () => {
      const result = getRandomFromArray(['one'], 1)
      expect(result).toEqual(['one'])
    })

    it('returns a random result', () => {
      const input = ['one', 'two']
      const result = getRandomFromArray(input, 1)
      expect(result).toHaveLength(1)
      expect(input).toContain(result[0])
    })

    it('returns results in random order', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      const result = getRandomFromArray(input, input.length)
      expect(result).not.toEqual(input)
    })

    it('does not return duplicates', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      const result = getRandomFromArray(input, input.length - 1)
      expect(result).toHaveLength(input.length - 1)

      const inputSum = input.reduce((sum, current) => sum + current)
      const resultSum = result.reduce((sum, current) => sum + current)

      const missingNumber = inputSum - resultSum
      expect(result).not.toContain(missingNumber)
    })

    it('does not mutate original input', () => {
      const input = [1, 2, 3]
      const inputClone = [...input]

      getRandomFromArray(input, 1)

      expect(input).toEqual(inputClone)
    })

    it('throws an error if it runs out choices', () => {
      const input = [1, 2, 3]

      expect(() => {
        getRandomFromArray(input, input.length + 1)
      }).toThrow('Cannot get random item, out of choices')
    })
  })
})
