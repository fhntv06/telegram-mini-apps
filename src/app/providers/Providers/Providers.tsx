import React from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Provider } from 'react-redux'
import store from '../../store'

import { NotificationProvider, PostHogProvider } from '../'

interface IProps {
	children: React.ReactNode
}

export const Providers = ({ children }: IProps) => {
	return (
		<TonConnectUIProvider manifestUrl={import.meta.env.VITE_PUBLIC_MANIFEST_URL}>
			<Provider store={store}>
				<PostHogProvider>
					<NotificationProvider>
						{children}
					</NotificationProvider>
				</PostHogProvider>
			</Provider>
		</TonConnectUIProvider>
	)
}
