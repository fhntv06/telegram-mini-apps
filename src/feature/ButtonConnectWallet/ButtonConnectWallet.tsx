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
  const wallet = useTonWallet();
  const address = useTonAddress();

  const handlerConnectWallet = async () => {
		onClick()
  }

  console.log('wallet ', wallet)
  console.log('address ', address)

  return (
		<Button
			className={cx('button', 'p')}
			type='gray'
			iconLeftName="wallet"
			sizeIcons='big'
			onClick={handlerConnectWallet}
		>
			Сonnect wallet
		</Button>
	)
}