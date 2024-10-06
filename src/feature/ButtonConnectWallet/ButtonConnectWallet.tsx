import {
  // TonConnectButton,
  useTonWallet,
  useTonAddress,
  useTonConnectUI,
  ActionConfiguration
} from '@tonconnect/ui-react'
import { useState } from 'react'

import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonConnectWallet.module.scss'

import { formatNumber } from '../../shared/utils'

const cx = classNames.bind(styles)

interface Props {
	onClick: () => void
}

export const ButtonConnectWallet = ({
	onClick,
}: Props) => {
	const [txInProcess, setTxInProcess] = useState<boolean>(false) 

  const [tonConnectUI] = useTonConnectUI();

  const wallet = useTonWallet();

  const address = useTonAddress();
  const rawAddress = useTonAddress(false);

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
		onClick()

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

  console.log('wallet ', wallet)
  console.log('address ', address)

	let textButton = 'Сonnect wallet';

  return (
		<Button
			className={cx('button', 'p')}
			type='gray'
			iconLeftName="wallet"
			sizeIcons='big'
			onClick={handlerSendTransaction}
		>
			{textButton}
		</Button>
	)
}