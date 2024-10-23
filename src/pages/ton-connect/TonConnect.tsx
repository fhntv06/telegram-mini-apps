// import WebApp from '@twa-dev/sdk';

// import { beginCell } from "@ton/core";
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

import { Button } from '../../shared'

import styles from './TonConnect.module.scss'

const cx = clns.bind(styles);

export const TonConnect: FC = () => {
  // @ts-ignore
  const [txInProcess, setTxInProcess] = useState<boolean>(false)

  const isConnectionRestored = useIsConnectionRestored()
  const [tonConnectUI] = useTonConnectUI();

  const wallet = useTonWallet();

  const address = useTonAddress();
  const rawAddress = useTonAddress(false);

  const transaction = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
      {
        address: "EQB-bjIC4WX9Al-yKbmnHcRgy4wZBac4aXtRB4a1OrRnxbO7",
        amount: "500000000", // Toncoin in nanotons
        payload: import.meta.env.VITE_DOWN_TRANSACTION
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
        onClick={handlerSendTransaction}
      >
        {textButton}
      </Button>
    </div>
  )
};