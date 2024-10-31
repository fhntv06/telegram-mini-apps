import {ActionConfiguration, SendTransactionRequest, useTonConnectUI, CHAIN, useTonWallet} from '@tonconnect/ui-react'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimationContext } from '../app/contexts'
import { AnimationContextTypes } from '../app/providers/types'
import {postDataBetDetailsPlayers} from "../app/api/user";
import {useUserData} from "./useUserData.ts";

export const useTransaction = (amount: number) => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler } = useContext<AnimationContextTypes>(AnimationContext)
  const { address, mainnet } = useSelector((state: any) => state.bets)
  // const userData = useUserData()

  // const initData = WebApp.initDataUnsafe;

  const sendTransaction = async (placeBet: string = 'up') => {
    setTxInProcess(true)

    // console.log('initData userData ', initData.user)

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

    postDataBetDetailsPlayers({
      telegram_user_image: userData?.photo_url || '',
      wallet_address: address,
      bet_amount: amount * 1e9,
      variant_bet: placeBet
    })
        .then((res) => console.log('Data postDataBetDetailsPlayers: ', res.data))
        .catch((error) => console.error('Error postDataBetDetailsPlayers: ', error))
    return

    window.addEventListener('ton-connect-ui-transaction-signed', (event) => {
      console.log('Event ', 'ton-connect-ui-transaction-signed')
      // @ts-ignore
      console.log('Transaction init', event.detail)

      postDataBetDetailsPlayers({
        telegram_user_image: userData?.photo_url || '',
        wallet_address: address,
        bet_amount: (amount * 1e9).toString(),
        variant_bet: placeBet
      })
        .then((res) => console.log('Data postDataBetDetailsPlayers: ', res.data))
        .catch((error) => console.error('Error postDataBetDetailsPlayers: ', error))
    })

    // TODO: взять адрес картинки из user.photo_url
    await tonConnectUI.sendTransaction(transaction, configuration)
      .then((data) => {
        console.log('data success transaction', data)
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