import { useState } from 'react'
import WebApp from '@twa-dev/sdk'
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import { postReferral } from '../app/api'

export const usePostReferral = () => {
  const address = useTonAddress()
  const wallet = useTonWallet()
  const [postReferralIsDone, setPostReferralIsDone] = useState<boolean>(false)

  const handlerPostReferral = () => {
    console.log({
      initData: WebApp.initData,
      address,
      referral: WebApp.initDataUnsafe.start_param,
      wallet,
    })

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

    return postReferral(data)
      .then((res) => {
        setPostReferralIsDone(true)
        console.log('Data post referral: ', res.data)
      })
      .catch(() => new Error('Error: for postReferral dont have data user!'))
  }

  return { postReferralIsDone, handlerPostReferral }
}