// import WebApp from '@twa-dev/sdk';
import {
  TonConnectButton,
  useTonWallet,
  useTonAddress,
  useTonConnectUI,
  useIsConnectionRestored,
  ActionConfiguration
} from '@tonconnect/ui-react'
import clns from 'classnames/bind'
import type { FC } from 'react'
import { useState } from 'react'

import { Button } from '../../shared/ui'

import styles from './TonConnect.module.scss'

const cx = clns.bind(styles);

export const TonConnect: FC = () => {
  const [txInProcess, setTxInProcess] = useState<boolean>(false) 

  const isConnectionRestored = useIsConnectionRestored()
  const [tonConnectUI] = useTonConnectUI();

  const wallet = useTonWallet();

  const address = useTonAddress();
  const rawAddress = useTonAddress(false);

  console.log('wallet ', wallet)
  console.log('address ', address)

  const transaction = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
      {
        address: "0QCuVcyJu4IypRhIVBTYHCx7eEbf4T7tEBopqR5dn-aP_Dh7",
        amount: "20000000", // Toncoin in nanotons
      },
    ],
  };
  const settingsTransaction: ActionConfiguration = {
    modals: 'all',
    notifications: 'all'
  }

  const handlerSendTransaction = async () => {
    if (!wallet) {
      tonConnectUI.connectWallet()
    } else {
      setTxInProcess(true);
      
      try {
        await tonConnectUI.sendTransaction(transaction, settingsTransaction)
      } catch (error) {
        console.log(error)
      }
      
      setTxInProcess(false);
    }
  }

  let textButton = '';

  if (!isConnectionRestored) {
    textButton = 'Loading ...'
  } else if (!!wallet) {
    textButton = 'Send transaction'
  } else if (!wallet) {
    textButton = 'Connect Wallet'
  }

  return !wallet ? (
    <header className={cx('header')}>
      <h3>To display the data related to the TON Connect, it is required to connect your wallet</h3>
      <TonConnectButton />
  </header>
  ) : (
    <div>
      <h3>Account</h3>
      <p>chain: {wallet.account.chain},</p>
      <p>publicKey: {wallet.account.publicKey},</p>
      <p>address: {wallet.account.address},</p>

      <h3>Device</h3>
      <p>appName: {wallet.device.appName},</p>
      <p>appVersion: {wallet.device.appVersion},</p>
      <p>maxProtocolVersion: {wallet.device.maxProtocolVersion},</p>
      <p>platform: {wallet.device.platform},</p>

      {
        address && (
          <>
            <h3>Address</h3>
            <p>Address: {address}</p>
          </>
        )
      }

      {
        rawAddress && (
          <>
            <h3>Address raw</h3>
            <p>Address raw: {rawAddress}</p>
          </>
        )
      }

      <Button
        disabled={isConnectionRestored || txInProcess}
        onClick={handlerSendTransaction}
      >
        {textButton}
      </Button>
    </div>
  )
};
