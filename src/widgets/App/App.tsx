import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk'
import { type FC, useContext, useEffect, useState } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom'

import {
  getAddressContract, getWalletBet, postReferral,
  getRetrievesData, getTasks, getLeaderboard
} from '../../app/api'
import { routes } from '../../app/routes'
import {
  setDataTransaction, setDefaultTasks, setGameStatus,
  setHintTasks, setLeaderboards, setPartnersTasks
} from '../../app/store/slices'
import { AnimationContext, NotificationContext } from '../../app/contexts'
import { setUserRetrievesData } from '../../app/store/slices'

import { INotificationContextTypes, IAnimationContextTypes } from '../../app/providers/types'

import { Onboarding } from '../'
import { PanelMenu } from '../../feature'
import { useGameSocket, usePriceHistory, useUserData, useDispatch, useSelector } from '../../hooks'
import { LoaderSpinner } from '../../shared'
import { AnimationWrapper } from '../../shared/blocks/AnimationWrapper'

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const data = useGameSocket()
  const priceHistory = usePriceHistory()
  const address = useTonAddress()
  const [skipOnBoarding, setSkipOnBoarding] = useState<boolean>(false)
  const wallet = useTonWallet()
  const { openHandler: openHandlerNotification, setTonsHandler, setPointsHandler } = useContext<INotificationContextTypes>(NotificationContext)
  const { openHandler: openHandlerAnimation } = useContext<IAnimationContextTypes>(AnimationContext)
  const { gamePhase } = useSelector((state) => state.gameStatus)
  const { bet } = useSelector((state) => state.bets)
  const { ticker, gameMode } = useSelector((state) => state.modeSettings)
  const userData = useUserData()

  // TODO: вынести все методы по получению данные при первом рендере в отдельный компонент
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
        .then(() => getRetrievesData(WebApp.initData))
        .then((retrievesData) => dispatch(setUserRetrievesData(retrievesData.data)))
        .catch(() => new Error('Error: for postReferral dont have data user!'))
    })
  }

  // for disconnect action
  useEffect(() => {
    if (WebApp.initData) handlerPostReferral()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])

  // update data backend
  useEffect(() => {
    if (data && 'btcPrice' in data && data.btcPrice && priceHistory.length) {
      setIsLoading(false)
      dispatch(setGameStatus({ ...data, priceHistory}))
    }
  }, [data, priceHistory])

  useEffect(() => {
    if (gamePhase === 4 && address && bet && userData?.id) {
      getWalletBet({ address, ticker, gameMode, demoTgId: userData.id })
      .then((res) => {
        console.log('res getWalletBet', res)
        if (res.data.error) {
          throw new Error('Error getWalletBet: res have error')
        }
        if (res.data.winReward) {
          openHandlerNotification('wins')
          setTonsHandler(res.data.winReward.tons)
          setPointsHandler(res.data.winReward.points)
          openHandlerAnimation('wins')
        } else if (res.data.loose) {
          openHandlerNotification('lose')
          setTonsHandler(res.data.loose)
        } else if (res.data.refund) {
          openHandlerNotification('refund')
          setTonsHandler(res.data.refund)
        }
      })
      .catch((error) => console.log(error))
    }
  }, [gamePhase])

  // initial process app
  useEffect(() => {
    getAddressContract()
      .then(({ data: { address, mainnet } }) => dispatch(setDataTransaction({ address, mainnet })))
      .catch((error) => {
        new Error('Error in getAddressContract: ' + error)

        dispatch(setDataTransaction({
          address: import.meta.env.VITE_ADDRESS_TRANSACTION,
          mainnet: true
        }))
      })

    getTasks(WebApp.initData)
      .then((res) => {
        dispatch(setHintTasks(res.data.hints))
        dispatch(setPartnersTasks(res.data.partners))
        dispatch(setDefaultTasks(res.data.tasks))
      })
      .catch((error) => new Error('Error in getTasks: ' + error))

    getLeaderboard()
      .then((res) => dispatch(setLeaderboards(res.data)))
      .catch((error) => new Error('Error in getTasks: ' + error))
  }, [])

  return (
    isLoading
      ? <LoaderSpinner />
      : skipOnBoarding
        ? (
          <AnimationWrapper style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Onboarding handlerSkip={setSkipOnBoarding}/>
          </AnimationWrapper>
        ) : (
        <BrowserRouter>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path='*' element={<Navigate to='/'/>}/>
          </Routes>
          <PanelMenu />
        </BrowserRouter>
      )
  )
}
