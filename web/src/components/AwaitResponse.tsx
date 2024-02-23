import * as TD from '../types'

import { ReactNode } from 'react'

import { ErrorIndicator } from './ErrorIndicator'
import { LoadingIndicator } from './LoadingIndicator'

export const AwaitResponse = <T,>({
  response,
  children,
}: {
  response: TD.APIResponse<T>
  children: (data: T) => ReactNode
}) => {
  switch (response.status) {
    case 'ERROR':
      console.error(response.error)
      return <ErrorIndicator error={response.error} />
    case 'LOADING':
      return <LoadingIndicator />
    case 'READY':
      return children(response.data)
  }
}
