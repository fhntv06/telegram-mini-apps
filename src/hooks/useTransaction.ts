import { ActionConfiguration, SendTransactionRequest, useTonConnectUI, CHAIN } from '@tonconnect/ui-react'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimationContext } from '../app/contexts'
import { AnimationContextTypes } from '../app/providers/types'

export const useTransaction = (amount: number) => {
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler } = useContext<AnimationContextTypes>(AnimationContext)
  const { address, mainnet } = useSelector((state: any) => state.bets)

  const sendTransaction = async (placeBet: string = 'up') => {
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

    // TODO: когда отправлен то ставим картину и отправляем
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