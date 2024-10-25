import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

import { App } from '../';
import { ErrorBoundary } from '../';

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

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider manifestUrl='https://raw.githubusercontent.com/tonpulse/CryptoMarketManifest/refs/heads/main/tonconect-manifest.json'>
        <App/>
      </TonConnectUIProvider>
    </ErrorBoundary>
  )
}
