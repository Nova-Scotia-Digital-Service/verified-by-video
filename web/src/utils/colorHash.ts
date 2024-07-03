/**
 * Deterministically hashes an input string to a hue angle (0 - 360).
 *
 * Based on https://github.com/RolandR/ColorHash/
 */
export const hueHash = (inputString: string) => {
  const sum = inputString.split('').reduce((sum, currentChar) => {
    return sum + currentChar.charCodeAt(0)
  }, 0)

  return Math.trunc(
    parseFloat(
      '0.' +
        Math.sin(sum + 1)
          .toString()
          .substring(6),
    ) * 360,
  )
}

/**
 * Generates a color in CSS `hsl()` function notation based on the input string.
 *
 * For any given string, the generated color will always be the same.
 */
export const stringToHsl = (inputString: string, saturation = 50, lightness = 75) => {
  const hue = hueHash(inputString)

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
