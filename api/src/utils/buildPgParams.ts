/**
 * Creates postgres parameter strings (eg: `"($1), ($2), ($3)"`) for multi-row values.
 */
export const buildPgParams: (values: unknown[]) => string = (values) => {
  if (values.length === 0) throw new Error('Input required')
  if (values.some((value) => typeof value !== typeof values[0])) throw new Error('Value types differ')

  let index = 1
  return values.map((_) => `($${index++})`).join(', ')
}

/**
 * Creates postgres parameter strings (eg: `"($1, $2), ($3, $4)"`) for nested multi-row values.
 */
export const buildNestedPgParams: (values: unknown[][]) => string = (values) => {
  if (values.length === 0 || values[0].length === 0) throw new Error('Input required')
  if (values.some((row) => row.length !== values[0].length)) throw new Error('Row lengths do not match')

  let index = 1
  return values.map((row) => `(${row.map(() => `$${index++}`).join(', ')})`).join(', ')
}
