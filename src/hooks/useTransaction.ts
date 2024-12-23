import WebApp from '@twa-dev/sdk'
import { ActionConfiguration, SendTransactionRequest, useTonConnectUI, CHAIN, useTonAddress } from '@tonconnect/ui-react'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimationContext, NotificationContext } from '../app/contexts'
import { IAnimationContextTypes, INotificationContextTypes } from '../app/providers/types'
import { postDataBetDetailsPlayers } from '../app/api/'
import { useGetPhrases, useUserData } from './'
import { isDemoMode } from '../shared/'
import { useFadeOut } from './useFadeOut'
import { useCountStorageTransaction } from '../hooks'

export const useTransaction = (amount: number) => {
  const tonAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler: openHandlerAnimation } = useContext<IAnimationContextTypes>(AnimationContext)
	const { openHandler: openHandlerNotification } = useContext<INotificationContextTypes>(NotificationContext)
  const { ticker, gameMode } = useSelector((state) => state.modeSettings)
  const { address, mainnet } = useSelector((state) => state.bets)
  const userData = useUserData()
  const {
    notEnoughDemoBalance,
    // yourAnOutOfTime
  } = useGetPhrases(['notEnoughDemoBalance', 'yourAnOutOfTime'])
  const { openFadeHandler } = useFadeOut()
  const { calculateCountStorageTransactionHandler } = useCountStorageTransaction()

  const sendTransaction = async (placeBet: 'up' | 'down') => {
    setTxInProcess(true)

    const configuration: ActionConfiguration = {
      modals: ['before', 'success', 'error'],
      notifications: ['before', 'success', 'error']
    }
    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address,
          amount: (amount * 1e9).toString(), // Toncoin in nanotons
          payload: placeBet === 'up' ? import.meta.env.VITE_UP_TRANSACTION : import.meta.env.VITE_DOWN_TRANSACTION
        },
      ],
      network: mainnet ? CHAIN.MAINNET : CHAIN.TESTNET
    }
    const data = {
      ticker,
      gameMode,
      initData: WebApp.initData,
      walletAddress: tonAddress,
      betAmount: amount * 1e9,
      variantBet: placeBet
    }

    const handlerPostDataBetDetailsPlayers = () => (
      postDataBetDetailsPlayers(data)
        .then((res) => {
          // TODO: показываем уведомление yourAnOutOfTime (что пользователь не успел поставить)
          // if (res.status !== 200) {
          //   openHandlerNotification('warning', { text: yourAnOutOfTime })
          // }
          openHandlerAnimation('youAreIn')

          return res
        })
    )

    if (gameMode === isDemoMode) {
      await handlerPostDataBetDetailsPlayers()
        .then(() => calculateCountStorageTransactionHandler())
        .catch((error) => {
          console.error('Error isDemoMode postDataBetDetailsPlayers: ', error)

          if (error.response.status === 400) {
            openHandlerNotification('warning', { text: notEnoughDemoBalance })
          }
        })
    } else {
      await tonConnectUI.sendTransaction(transaction, configuration)
        .then(() => {
          if (userData?.id) {
            handlerPostDataBetDetailsPlayers()
              .catch((error) => console.error('Error isRealMode postDataBetDetailsPlayers: ', error))
          }
          openFadeHandler(document.querySelector('[data-tc-modal]'), 500)
        })
        .catch((error) => console.error('Error sendTransaction: ', error))
    }

    setTxInProcess(false)
  }

  return {
    txInProcess,
    sendTransaction,
  }
}
