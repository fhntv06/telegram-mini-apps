import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTonAddress } from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk';
// import { retrieveLaunchParams } from '@telegram-apps/sdk'
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
  const address = useTonAddress()
  const userData = useUserData()
  const [referral, setReferral] = useState<string>('')
  // const { initDataRaw, initData } = retrieveLaunchParams();

  useEffect(() => {
    if (!referral || !userData?.id || !address) {
      new Error(`Error: for postReferral dont have user
        ${!referral ? 'referral' : !userData?.id ? 'telegram id' : !address ? 'address' : ''}
      !`)
    } else {
      // TODO: вынести логику лишних запросов выше
      postReferral(
        {
          telegram_id: `${userData?.id}`,
          wallet_address: address,
          referral,
        }
      )
        .then((res)=> {
          console.log('Data post referral: ', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [referral])

  useEffect(() => {
    if (data && data.btcPrice && priceHistory.length) {
      setIsLoading(false)
      dispatch(setGameStatus({ ...data, priceHistory}))
    }
  }, [data, priceHistory])

  useEffect(() => {
    getAddressContract()
      .then(({ data: { address, mainnet } }) => {
        dispatch(
          setDataTransaction({ address, mainnet })
        )

        if (WebApp.initDataUnsafe.start_param) {
          setReferral(WebApp.initDataUnsafe.start_param || '')
        }
      })
      .catch((error) => {
        new Error('Error in getAddressContract: ' + error)

        dispatch(
          setDataTransaction({
            address: import.meta.env.VITE_ADDRESS_TRANSACTION,
            mainnet: true
          })
        )
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