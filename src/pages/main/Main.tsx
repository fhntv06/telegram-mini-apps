import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk';
import classNames from 'classnames/bind'
import { AnimatePresence, motion, useWillChange } from 'framer-motion'
import { postReferral } from '../../app/api'
import { MainHeader, MainFooter, Chart, Onboarding } from '../../widgets'
import { ModalProvider, NotificationProvider, AnimationProvider } from '../../app/providers'

import styles from './Main.module.scss'

import { useGameSocket, usePriceHistory, useUserData } from '../../hooks/'
import { setGameStatus } from '../../app/store/slices/game'
import { LoaderSpinner } from '../../shared'

import { getAddressContract } from '../../app/api/game'
import { setDataTransaction } from '../../app/store/slices/bets'
import { setUserDataTelegram } from '../../app/store/slices/user'

const cx = classNames.bind(styles)

export const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const data = useGameSocket()
  const priceHistory = usePriceHistory()
  const address = useTonAddress()
  const userData = useUserData()
  const [referral, setReferral] = useState<string>('')
  const [skipOnBoarding, setSkipOnBoarding] = useState<boolean>(false)
  const willChange = useWillChange()
  const wallet = useTonWallet()

  useEffect(() => {
    if (!userData?.id) new Error('Error: for postReferral dont have user telegram id!')
    else {
      const data: { telegram_id: string, wallet_address?: string, referral?: string } = {
        telegram_id: `${userData?.id}`,
      }

      if (address) {
        data['wallet_address'] = address
      }
      if (referral) {
        data['referral'] = referral
      }

      postReferral(data)
        .then((res)=> console.log('Data post referral: ', res.data))
        .catch((err) => console.log(err))
    }
  }, [wallet])

  // update data backend
  useEffect(() => {
    if (data && data.btcPrice && priceHistory.length) {
      setIsLoading(false)
      dispatch(setGameStatus({ ...data, priceHistory}))
    }
  }, [data, priceHistory])

  // initial process app
  useEffect(() => {
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      dispatch(
        setUserDataTelegram(WebApp.initDataUnsafe.user)
      )
    }

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

  return (
    isLoading
      ? <LoaderSpinner />
        : !skipOnBoarding
          ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: .1,
                  duration: .3,
                  ease: 'easeIn',
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  willChange,
                  height: '100%',
                }}
              >
                <Onboarding handlerSkip={setSkipOnBoarding}/>
              </motion.div>
            </AnimatePresence>
          ) : (
            <ModalProvider>
              <NotificationProvider>
                <AnimationProvider>
                  <main className={cx('main')}>
                    <MainHeader/>
                    <Chart/>
                    <MainFooter/>
                  </main>
                </AnimationProvider>
              </NotificationProvider>
            </ModalProvider>
          )
  )
}