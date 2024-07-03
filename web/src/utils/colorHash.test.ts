import { hueHash, stringToHsl } from './colorHash'

describe('hueHash', () => {
  it('hashes strings to hue angles', () => {
    expect(hueHash('')).toBe(255)
    expect(hueHash(' ')).toBe(42)
    expect(hueHash('  ')).toBe(103)
    expect(hueHash('a')).toBe(137)
    expect(hueHash('A')).toBe(198)
    expect(hueHash('Some String')).toBe(10)
    expect(hueHash('Some Other String')).toBe(108)
    expect(hueHash('""')).toBe(282)
    expect(hueHash("''")).toBe(40)
    expect(hueHash(`!#$%&'()*+,-./[\\]^_{|}~`)).toBe(130)
    expect(hueHash('Unicode 🐬')).toBe(12)
    expect(hueHash('Unicode ☃')).toBe(271)
  })
})

describe('stringToHsl', () => {
  it('creates a hue function string', () => {
    expect(stringToHsl('')).toBe('hsl(255, 50%, 75%)')
    expect(stringToHsl('Some String', 100)).toBe('hsl(10, 100%, 75%)')
    expect(stringToHsl('Unicode 🐬', 75, 50)).toBe('hsl(12, 75%, 50%)')
  })
})
