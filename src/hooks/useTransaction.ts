import {
  useTonWallet,
  useTonAddress,
  useTonConnectUI,
  ActionConfiguration,
  SendTransactionRequest
} from '@tonconnect/ui-react'
import { useState } from 'react'

interface ITransaction {
  amount: number
}

export const useTransaction = (data: ITransaction) => {
  const { amount } = data;

  const wallet = useTonWallet()
  const address = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)

  const sendTransaction = async () => {
    console.log('SendTransaction run!')

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
            address,
            amount: (amount * 1e9).toString(), // Toncoin in nanotons
          },
        ],
      };

      try {
        await tonConnectUI.sendTransaction(transaction, settingsTransaction)
      } catch (error) {
        console.log(error)
      }

      setTxInProcess(false);
    }
  }

  return {
    txInProcess,
    sendTransaction,
  }
}