import React from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Provider } from 'react-redux'
import store from '../../store'

import { AnimationProvider, ModalProvider, NotificationProvider, PostHogProvider } from '../'

interface IProps {
	children: React.ReactNode
}

export const Providers = ({ children }: IProps) => {
	return (
		<TonConnectUIProvider manifestUrl={import.meta.env.VITE_PUBLIC_MANIFEST_URL}>
			<Provider store={store}>
				<PostHogProvider>
					<ModalProvider>
						<NotificationProvider>
							<AnimationProvider>
								{children}
							</AnimationProvider>
						</NotificationProvider>
					</ModalProvider>
				</PostHogProvider>
			</Provider>
		</TonConnectUIProvider>
	)
}
