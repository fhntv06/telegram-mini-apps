import {ActionConfiguration, SendTransactionRequest, useTonConnectUI, CHAIN, useTonAddress} from '@tonconnect/ui-react'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimationContext } from '../app/contexts'
import { AnimationContextTypes } from '../app/providers/types'
import { postDataBetDetailsPlayers } from '../app/api/user'

export const useTransaction = (amount: number) => {
  const tonAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler } = useContext<AnimationContextTypes>(AnimationContext)
  const { address, mainnet } = useSelector((state: any) => state.bets)
  const userDataTelegram = useSelector((state: any) => state.userDataTelegram)

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

    await tonConnectUI.sendTransaction(transaction, configuration)
      .then(() => {
        postDataBetDetailsPlayers({
          telegram_id: userDataTelegram.id,
          wallet_address: tonAddress,
          bet_amount: amount * 1e9,
          variant_bet: placeBet
        })
          .then(() => openHandler('youAreIn'))
          .catch((error) => console.error('Error postDataBetDetailsPlayers: ', error))
      })
      .catch((error) => console.error('Error sendTransaction: ', error))

    setTxInProcess(false)
  }

  return {
    txInProcess,
    sendTransaction,
  }
}