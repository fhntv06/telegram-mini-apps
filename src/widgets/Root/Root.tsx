import { type FC, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { init, viewport } from '@telegram-apps/sdk'

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

const setFullscreen = async () => {
  // два требования
  init() // инициализация
  await viewport.mount() // монтирование

  if (viewport.requestFullscreen.isAvailable()) {
    // переход режим requestFullscreen
    await viewport.requestFullscreen()
  }
}

export const Root: FC = () => {
  useEffect(() => {
    import('eruda').then((lib) => lib.default.init())

    new Promise((resolve) => resolve(null))
      .then(() => {
        WebApp.setHeaderColor('#1C1C1E')

        // проверка на мобилку
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          setFullscreen()
            .catch((err) => {
              console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
            })
        }
      })
  }, [])

  useEffect(() => {
    const closeApp = () => WebApp.close()

    // WebApp.expand() // открываем на весь экран

    WebApp.BackButton.onClick(closeApp)

    return () => WebApp.BackButton.offClick(closeApp)
  }, [])

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  )
}
