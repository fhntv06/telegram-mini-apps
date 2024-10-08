import {ActionConfiguration, SendTransactionRequest, useTonConnectUI, useTonWallet} from '@tonconnect/ui-react'
import {useState} from 'react'
// import {getAddressContract} from '../app/api/game'

export const useTransaction = (amount: number) => {
  const wallet = useTonWallet()
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)

  const sendTransaction = async () => {
    console.log('SendTransaction run!')
    alert('SendTransaction run!')

    // const address = await getAddressContract()

    alert(`SendTransaction wallet is ${JSON.stringify(wallet, null, 2)}`)
    // alert(`SendTransaction wallet is ${JSON.stringify(address, null, 2)}`)

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
            address: import.meta.env.VITE_ADDRESS_TRANSACTION,
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