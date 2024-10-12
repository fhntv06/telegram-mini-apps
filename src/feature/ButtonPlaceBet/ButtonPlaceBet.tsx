import { useSelector } from 'react-redux'
import { useTonWallet } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { useTransaction } from '../../hooks';
import { Button } from '../../shared'

import styles from './ButtonPlaceBet.module.scss'

const cx = classNames.bind(styles)

interface Props {
	onClick?: () => void,
	type?: 'up' | 'down'
}

export const ButtonPlaceBet = ({
	onClick,
	type = 'up',
}: Props) => {
  const wallet = useTonWallet()

	const { bet } = useSelector((state: any) => state.bets)
	const { txInProcess, sendTransaction } = useTransaction(bet)

	const handlerPlaceBet = async () => {
		if (bet && wallet) {
			sendTransaction(type)
			if (onClick) onClick()
		}
	}

	const disabled = !bet || !wallet
	const textButton = txInProcess ? 'Loading ...' : `GO ${type}`

	return (
		<Button
			type='bet'
			className={cx('button-placebet', type, 'p', { 'disabled': !bet })}
			onClick={handlerPlaceBet}
			disabled={disabled}
		>
			{textButton}
		</Button>
	)
}