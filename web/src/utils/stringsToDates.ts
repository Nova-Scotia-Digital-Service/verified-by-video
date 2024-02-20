const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)Z$/

const isIsoDateString = (value: unknown): boolean => {
  return value ? typeof value === 'string' && isoDateFormat.test(value) : false
}

export const stringsToDates = (object: any) => {
  for (const key of Object.keys(object)) {
    const value = object[key]
    if (isIsoDateString(value)) object[key] = new Date(value)
    else if (typeof value === 'object') stringsToDates(value)
  }
}
