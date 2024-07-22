import { randomInt } from 'node:crypto'

/**
 * Returns n unique random elements from array
 */
export const getRandomFromArray: <T>(array: readonly T[], count: number) => T[] = (array, count) => {
  const arrayMutableClone = [...array]

  let output: typeof arrayMutableClone = []

  for (let n = 0; n < count; n++) {
    if (arrayMutableClone.length === 0) throw new Error('Cannot get random item, out of choices')

    const randomIndex = randomInt(arrayMutableClone.length)
    const [randomValue] = arrayMutableClone.splice(randomIndex, 1)

    output.push(randomValue)
  }

  return output
}
