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
  // const [placeBet, setPlaceBet] = useState<'up' | 'down'>('up')

  const handlerTransactionSignedEvent = (event: any) => {
    console.log('Event ', 'ton-connect-ui-transaction-signed')
    // @ts-ignore
    console.log('Transaction init', event.detail)

    postDataBetDetailsPlayers({
      telegram_user_image: userDataTelegram?.photo_url ||
        import.meta.env.VITE_API_PROTOCOL + '://'
        + import.meta.env.VITE_DOMAIN + ':'
        + import.meta.env.VITE_PORT + '/images/avatars/player1.svg',
      wallet_address: userDataWallet.address,
      bet_amount: amount * 1e9,
      variant_bet: 'up' //placeBet
    })
      .then((res) => console.log('Data postDataBetDetailsPlayers: ', res.data))
      .catch((error) => console.error('Error postDataBetDetailsPlayers: ', error))
  }

  useEffect(() => {
    window.addEventListener('ton-connect-ui-transaction-signed', handlerTransactionSignedEvent)

    return window.removeEventListener('ton-connect-ui-transaction-signed', handlerTransactionSignedEvent)
  }, [])

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

    // TODO: postDataBetDetailsPlayers отправляем когда успех в transaction-signed

    // setPlaceBet(placeBet)

    // TODO: взять адрес картинки из user.photo_url
    await tonConnectUI.sendTransaction(transaction, configuration)
      .then(() => openHandler('youAreIn'))
      .catch((error) => console.error('Error sendTransaction: ', error))

    setTxInProcess(false)
  }

  return {
    txInProcess,
    sendTransaction,
  }
}