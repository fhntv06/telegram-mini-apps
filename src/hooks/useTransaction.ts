import { ActionConfiguration, SendTransactionRequest, useTonConnectUI } from '@tonconnect/ui-react'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddressContract } from '../app/api/game'
import { AnimationContext } from '../app/contexts'
import { AnimationContextTypes } from '../app/providers/types'
import { setAddressTransaction } from '../app/store/slices/bets'

export const useTransaction = (amount: number) => {
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler } = useContext<AnimationContextTypes>(AnimationContext)
  const dispatch = useDispatch()
  const { address: addressTransactionStore } = useSelector((state: any) => state.bets)
  
  const sendTransaction = async (placeBet: string = 'up') => {
    setTxInProcess(true)

    const addressTransaction = addressTransactionStore || (
      await getAddressContract()
        .then(({ data: { address } }) => {
          dispatch(
            setAddressTransaction({ address })
          )

          return address
        })
        .catch((error) => {
          new Error('Error in getAddressContract: ' + error)
          
          return import.meta.env.VITE_ADDRESS_TRANSACTION
        })
    )

    const settingsTransaction: ActionConfiguration = {
      modals: 'all',
      notifications: 'all'
    }

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: addressTransaction,
          amount: (amount * 1e9).toString(), // Toncoin in nanotons
          payload: placeBet === 'up' ? import.meta.env.VITE_UP_TRANSACTION : import.meta.env.VITE_DOWN_TRANSACTION
        },
      ],
    }

    await tonConnectUI.sendTransaction(transaction, settingsTransaction)
      .then(() => openHandler('youAreIn'))
      .catch((error) => console.log('sendTransaction: ', error))

    setTxInProcess(false)
  }

  return {
    txInProcess,
    sendTransaction,
  }
}