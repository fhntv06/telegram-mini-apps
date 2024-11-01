import { ActionConfiguration, SendTransactionRequest, useTonConnectUI, CHAIN } from '@tonconnect/ui-react'
import {useContext, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { AnimationContext } from '../app/contexts'
import { AnimationContextTypes } from '../app/providers/types'
import { postDataBetDetailsPlayers } from '../app/api/user'

export const useTransaction = (amount: number) => {
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler } = useContext<AnimationContextTypes>(AnimationContext)
  const { address, mainnet } = useSelector((state: any) => state.bets)
  const userDataTelegram = useSelector((state: any) => state.userDataTelegram)
  const userDataWallet = useSelector((state: any) => state.userDataWallet)
  const [placeBet, setPlaceBet] = useState<'up' | 'down'>('up')

  const handlerTransactionSignedEvent = () => {
    console.log('Event ', 'ton-connect-ui-transaction-signed')

    postDataBetDetailsPlayers({
      telegram_user_image: userDataTelegram?.photo_url ||
        import.meta.env.VITE_API_PROTOCOL + '://'
        + import.meta.env.VITE_DOMAIN + ':'
        + import.meta.env.VITE_PORT + '/images/avatars/player1.svg',
      wallet_address: userDataWallet.address,
      bet_amount: amount * 1e9,
      variant_bet: placeBet
    })
      .then((res) => console.log('Data postDataBetDetailsPlayers: ', res.data))
      .catch((error) => console.error('Error postDataBetDetailsPlayers: ', error))
  }

  useEffect(() => {
    window.addEventListener('ton-connect-ui-transaction-signed', handlerTransactionSignedEvent)

    console.log('повешен ton-connect-ui-transaction-signed')

    return window.removeEventListener('ton-connect-ui-transaction-signed', handlerTransactionSignedEvent)
  }, [placeBet])

  const sendTransaction = async (placeBet: 'up' | 'down') => {
    setTxInProcess(true)

    const configuration: ActionConfiguration = {
      modals: 'all',
      notifications: 'all'
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

    setPlaceBet(placeBet)

    await tonConnectUI.sendTransaction(transaction, configuration)
      .then(() => {
        handlerTransactionSignedEvent()
        openHandler('youAreIn')
      })
      .catch((error) => console.error('Error sendTransaction: ', error))

    setTxInProcess(false)
  }

  return {
    txInProcess,
    sendTransaction,
  }
}