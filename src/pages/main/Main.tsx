import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTonWallet } from "@tonconnect/ui-react"
// import { postEvent } from '@telegram-apps/sdk'
import classNames from 'classnames/bind'
import { postReferral } from '../../app/api'
import { MainHeader, MainFooter, Chart } from '../../widgets'

import { ModalProvider, NotificationProvider, AnimationProvider } from '../../app/providers'

import styles from './Main.module.scss'

import { useGameSocket, usePriceHistory, useUserData } from '../../hooks/'
import { setGameStatus } from '../../app/store/slices/game'
import { LoaderSpinner } from '../../shared'

import { getAddressContract } from '../../app/api/game'
import { setDataTransaction } from '../../app/store/slices/bets'

const cx = classNames.bind(styles)

export const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const data = useGameSocket()
  const priceHistory = usePriceHistory()
  const wallet = useTonWallet()
  const userData = useUserData()
  const [referral, setReferral] = useState<null| string>(null)

  useEffect(() => {
    // alert('userData?.id: ' + userData?.id)
    if (wallet && userData?.id && referral) {
      postReferral(
        {
          telegram_id: userData?.id,
          wallet_address: wallet,
          referral,
        }
      )
      .then((res)=> {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [wallet])

  useEffect(() => {
    if (data && data.btcPrice && priceHistory.length) {
      setIsLoading(false)
      dispatch(setGameStatus({ ...data, priceHistory}))
    }
  }, [data, priceHistory])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    // alert(hash)
    const params = new URLSearchParams(hash)

    // alert(JSON.stringify(params))
    // alert(params.get('tgWebAppStartParam'))

    if (params.get('tgWebAppStartParam')) {
      setReferral(params.get('tgWebAppStartParam'))
    }

    console.log('tgWebAppStartParam ', params.get('tgWebAppStartParam'))

    getAddressContract()
      .then(({ data: { address, mainnet } }) => {
        dispatch(
          setDataTransaction({ address, mainnet })
        )

        console.log('запрос getAddressContract')
        console.log({ address, mainnet })

        return address
      })
      .catch((error) => {
        new Error('Error in getAddressContract: ' + error)
        
        return import.meta.env.VITE_ADDRESS_TRANSACTION
      })
  }, [])
  // postEvent('web_app_set_background_color', { color: '#1C1C1E' })

  return (
    isLoading
      ? <LoaderSpinner />
      : (
        <ModalProvider>
          <NotificationProvider>
            <AnimationProvider>
              <main className={cx('main')}>
                <MainHeader />
                <Chart />
                <MainFooter />
              </main>
            </AnimationProvider>
          </NotificationProvider>
        </ModalProvider>
      )
  )
}