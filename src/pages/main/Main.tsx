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
    if (!referral) new Error('Error: for postReferral dont have referral!')
    if (!userData?.id) new Error('Error: for postReferral dont have user telegram id!')

    postReferral(
      {
        telegram_id: `${userData?.id}`,
        wallet_address: address,
        referral,
      }
    )
    .then((res)=> {
      console.log('Запрос postReferral!')
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
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

        console.log('WebApp.initDataUnsafe.start_param ', WebApp.initDataUnsafe.start_param)

        setReferral(WebApp.initDataUnsafe.start_param || '')

        const hash = window.location.hash.slice(1)
        const params = new URLSearchParams(hash)

        console.log('window.location.hash ', window.location.hash)
        console.log('hash ', hash)
        console.log('params ', params)

        for(const [ key, value ] of params) {
          console.log(key, value)
        }

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