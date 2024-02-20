import * as TD from '../types'

import { ReactNode } from 'react'

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
      return <div>Error</div>
    case 'LOADING':
      return <div>Loading</div>
    case 'READY':
      return children(response.data)
  }
}
