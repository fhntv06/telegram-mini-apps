import { ActionConfiguration, SendTransactionRequest, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import {useContext, useState} from 'react'
import { getAddressContract } from '../app/api/game'
import { AnimationContext } from '../app/contexts'
import { AnimationContextTypes } from '../app/providers/types'

export const useTransaction = (amount: number) => {
  const wallet = useTonWallet()
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler } = useContext<AnimationContextTypes>(AnimationContext)

  const sendTransaction = async (placeBet: string = 'up') => {
    setTxInProcess(true);

    const address = await getAddressContract()
      .then((res) => res.data.address)
      .catch((error) => {
        new Error(error)

        return import.meta.env.VITE_ADDRESS_TRANSACTION
      })

    if (!wallet) tonConnectUI.connectWallet()
    else {
      setTxInProcess(true);

      const settingsTransaction: ActionConfiguration = {
        modals: 'all',
        notifications: 'all'
      }

      const transaction: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        messages: [
          {
            address,// import.meta.env.VITE_ADDRESS_TRANSACTION,
            amount: (amount * 1e9).toString(), // Toncoin in nanotons
            payload: placeBet === 'up' ? import.meta.env.VITE_UP_TRANSACTION : import.meta.env.VITE_DOWN_TRANSACTION
          },
        ],
      };

      try {
        await tonConnectUI.sendTransaction(transaction, settingsTransaction)
      } catch (error) {
        console.log(error)
      }

      openHandler('youAreIn')
      setTxInProcess(false)
    }
  }

  return {
    txInProcess,
    sendTransaction,
  }
}