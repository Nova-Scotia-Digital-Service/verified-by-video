import { isIsoDateString, stringsToDates } from './stringsToDates'

describe('isIsoDateString', () => {
  it('rejects invalid or partial values', () => {
    expect(isIsoDateString(undefined)).toBe(false)
    expect(isIsoDateString(1)).toBe(false)
    expect(isIsoDateString(new Date())).toBe(false)
    expect(isIsoDateString('hello')).toBe(false)
    expect(isIsoDateString('2024-12-12')).toBe(false)
    expect(isIsoDateString('2024-12-12T11:22:33.Z')).toBe(false)
  })

  it('accepts full ISO timestamps', () => {
    expect(isIsoDateString('2024-12-12T11:22:33Z')).toBe(true)
    expect(isIsoDateString('2024-12-12T11:22:33.1234Z')).toBe(true)
  })
})

describe('stringsToDates', () => {
  it('recurses through an object and converts ISO strings to date objects', () => {
    const objectWithNestedDates = {
      outerDate: '2024-12-12T11:22:33Z',
      outerText: 'not a date',
      innerObject: {
        innerDate: '2024-12-12T11:22:33.1234Z',
        innerText: 'also not a date',
      },
    }

    expect(typeof objectWithNestedDates.outerDate).toBe('string')
    expect(typeof objectWithNestedDates.innerObject.innerDate).toBe('string')

    stringsToDates(objectWithNestedDates) // converts in place

    expect(objectWithNestedDates.outerDate).toBeInstanceOf(Date)
    expect(objectWithNestedDates.outerText).toBe('not a date')
    expect(objectWithNestedDates.innerObject.innerDate).toBeInstanceOf(Date)
    expect(objectWithNestedDates.innerObject.innerText).toBe('also not a date')
  })
})
