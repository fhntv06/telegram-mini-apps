import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTonAddress } from '@tonconnect/ui-react'
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