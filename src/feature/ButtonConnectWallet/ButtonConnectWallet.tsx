import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonConnectWallet.module.scss'
import { TonConnectButton } from '@tonconnect/ui-react';

const cx = classNames.bind(styles)

interface Props {
	onClick?: () => void
}

export const ButtonConnectWallet = ({
	onClick,
}: Props) => {
	const handlerConnectWallet = async () => {
		if (onClick) onClick()
  }

  return (
		<>
			<TonConnectButton className={cx('button', 'p')} />
			<Button
				className={cx('button', 'p')}
				iconLeftName="wallet"
				sizeIcons='big'
				type='gray'
				onClick={handlerConnectWallet}
			>
				Connect wallet
			</Button>
		</>

	)
}