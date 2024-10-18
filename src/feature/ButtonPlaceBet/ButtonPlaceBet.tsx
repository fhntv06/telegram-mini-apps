import { useSelector } from 'react-redux'
import { useTonWallet } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { useTransaction, useGetPhrases } from '../../hooks';
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
	const { gamePhase } = useSelector((state: any) => state.gameStatus)
	const { txInProcess, sendTransaction } = useTransaction(bet)

  // @ts-ignore
  const { goUp, goDown } = useGetPhrases(['goUp', 'goDown'])

	const handlerPlaceBet = async () => {
		navigator.vibrate(500)

		sendTransaction(type)
		if (onClick) onClick()
	}

	const disabled = !bet || !wallet && gamePhase === 1
	const textButton = txInProcess ? 'Loading ...' : type === 'up' ? goUp : goDown

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