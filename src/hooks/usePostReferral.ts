import WebApp from '@twa-dev/sdk'
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import { postReferral } from '../app/api'

export const usePostReferral = () => {
	const address = useTonAddress()
	const wallet = useTonWallet()

	const handlerPostReferral = () => {
		console.log({
			initData: WebApp.initData,
			address,
			referral: WebApp.initDataUnsafe.start_param,
			wallet,
		})

		if (WebApp.initData) {
			// For wait Telegram data
			const data: { initData: string, walletAddress?: string, referral?: string } = {
				initData: WebApp.initData,
			}

			if (address) {
				data['walletAddress'] = address
			}
			if (WebApp.initDataUnsafe.start_param) {
				data['referral'] = WebApp.initDataUnsafe.start_param
			}

			postReferral(data)
				.then((res) => console.log('Data post referral: ', res.data))
				.catch(() => new Error('Error: for postReferral dont have data user!'))
		}
	}

	return { handlerPostReferral }
}
