// import WebApp from '@twa-dev/sdk';
import {
  TonConnectButton,
  useTonWallet,
  useTonAddress,
  useTonConnectUI,
  useIsConnectionRestored,
} from '@tonconnect/ui-react'
import clns from 'classnames/bind'
import type { FC } from 'react'
import { useState } from 'react'
import { Button } from '../../shared'
import styles from './TonConnect.module.scss'
import {beginCell, toNano} from '@ton/ton'

const cx = clns.bind(styles);
/**
	* Creates a transaction object for placing a bet.
	*
	* @param {boolean} bet - Indicates whether the bet is up_bet (true) or down_bet (false).
	* @param {number} betSize - The size of the bet, which will be converted to nano (the unit of measurement used in the blockchain).
	*
	* @returns {Object} The transaction object containing:
	*   - validUntil: The time (in seconds) until which the transaction will be valid (60 seconds from the current moment).
	*   - messages: An array of messages for the transaction, each containing:
	*     - address: The pool address
	*     - amount: The amount in nano equivalent to the size of the bet.
	*     - stateInit: The state initialization encoded in base64 format, including metadata about the bet.
	*
	* Note: The pool address must be specified in an environment variable or retrieved from the server.
	*/
function CreateTransaction(bet: boolean, betSize: number){
  const pool_address = "EQCXtpXtKSXi0BeauMwLYJTsEWcHJeYLTubJUBR76uXxiyAb"
  return {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: pool_address,
        amount: toNano(betSize).toString(),
        stateInit:
          beginCell()
          .storeUint(0x40af0d0a, 32)
          .storeUint(bet ? 1: 0 ,1)
          .endCell().toString('base64')
      },
    ]
  }
}
export const TonConnect: FC = () => {
  const [txInProcess, setTxInProcess] = useState<boolean>(false) 
  const isConnectionRestored = useIsConnectionRestored()
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();
  const rawAddress = useTonAddress(false);
  console.log('wallet ', wallet)
  console.log('address ', address)
  const handlerSendTransaction = async () => {
    if (!wallet) {
      tonConnectUI.connectWallet()
    } else {
      setTxInProcess(true);
      
      try {
        //example of using CreateTransaction
        await tonConnectUI.sendTransaction(CreateTransaction(false, 0.5))
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