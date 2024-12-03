import { PostHogProvider as Provider } from 'posthog-js/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const PostHogProvider = ({ children }: IProps) => {
  return (
    <Provider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      }}
    >
      {children}
    </Provider>
  )
}
