import * as TD from '../types'

import { useState } from 'react'

export const useResponse = <T>() => {
  const [response, setResponse] = useState<TD.APIResponse<T>>({ status: 'LOADING' })

  return [response, setResponse] as const
}
