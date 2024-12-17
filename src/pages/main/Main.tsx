import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useTonAddress } from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk'
import classNames from 'classnames/bind'
import { AnimatePresence, motion, useWillChange } from 'framer-motion'
import { postReferral, getAddressContract } from '../../app/api'
import { ModalProvider, NotificationProvider, AnimationProvider } from '../../app/providers'
import { MainHeader, MainFooter, Chart, Onboarding, ModalSelectGameMode } from '../../widgets'
import { useGameSocket, usePriceHistory } from '../../hooks/'
import { setGameStatus, setDataTransaction } from '../../app/store/slices'

import { LoaderSpinner } from '../../shared'

import styles from './Main.module.scss'

const cx = classNames.bind(styles)

export const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hiddenModalSelectMode, setHiddenModalSelectMode] = useState<boolean>(true)
  const dispatch = useDispatch()
  const data = useGameSocket()
  const priceHistory = usePriceHistory()
  const address = useTonAddress()
  const { isConnected } = useSelector((state: any) => state.userDataWallet)
  const [skipOnBoarding, setSkipOnBoarding] = useState<boolean>(false)
  const willChange = useWillChange()

  // TODO: переписать реализацию получения данных из контекста
  // согласно видео: https://www.youtube.com/watch?v=k2g_Og3CFKU
  const handlerPostReferral = () => {
    new Promise((resolve) => resolve(null))
      .then(() => {
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
          .then((res)=> console.log('Data post referral: ', res.data))
          .catch(() => new Error('Error: for postReferral dont have data user!'))
      })
  }

  // for disconnect action
  useEffect(() => {
    if (WebApp.initData) {
      handlerPostReferral()
    }
  }, [isConnected])

  // update data backend
  useEffect(() => {
    if (data && 'btcPrice' in data && data.btcPrice && priceHistory.length) {
      setIsLoading(false)
      dispatch(setGameStatus({ ...data, priceHistory}))
    }
  }, [data, priceHistory])

  // initial process app
  useEffect(() => {
    setHiddenModalSelectMode(false)

    getAddressContract()
      .then(({ data: { address, mainnet } }) => dispatch(setDataTransaction({ address, mainnet })))
      .catch((error) => {
        new Error('Error in getAddressContract: ' + error)

        dispatch(setDataTransaction({
            address: import.meta.env.VITE_ADDRESS_TRANSACTION,
            mainnet: true
          }))
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
                  {!hiddenModalSelectMode && (
                    <ModalSelectGameMode isOpen={!hiddenModalSelectMode} closeHandler={setHiddenModalSelectMode}/>
                  )}
                </AnimationProvider>
              </NotificationProvider>
            </ModalProvider>
          )
  )
}
