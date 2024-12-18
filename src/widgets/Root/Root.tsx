import { type FC, useEffect } from 'react'
import React from 'react'
import WebApp from '@twa-dev/sdk'

import { App } from '../'
import { ErrorBoundary } from '../'

import { Providers } from '../../app/providers'

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
)

export const Root: FC = () => {
  useEffect(() => {
    import('eruda').then((lib) => lib.default.init())

    new Promise((resolve) => resolve(null))
      .then(() => WebApp.setHeaderColor('#1C1C1E'))
  }, [])

  useEffect(() => {
    const closeApp = () => WebApp.close()

    WebApp.expand()
    WebApp.BackButton.onClick(closeApp)

    return () => WebApp.BackButton.offClick(closeApp)
  }, [])

  return (
    <React.StrictMode>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <Providers>
          <App />
        </Providers>
      </ErrorBoundary>
    </React.StrictMode>
  )
}
