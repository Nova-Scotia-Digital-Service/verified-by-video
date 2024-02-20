import React from 'react'

import { Error } from './Error'

type ErrorBoundaryProps = {
  path?: string
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Error logging would go here
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error on navigation
    if (this.state.hasError && this.props.path !== prevProps.path) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <Error error={this.state.error} />
    }

    return this.props.children
  }
}
