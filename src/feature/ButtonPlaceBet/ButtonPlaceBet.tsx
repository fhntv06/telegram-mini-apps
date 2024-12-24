import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { useTransaction, useGetPhrases, useSelector } from '../../hooks'
import { Button, minBet } from '../../shared'

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
	const [tonConnectUI] = useTonConnectUI()
	const { bet } = useSelector((state) => state.bets)
	const { gamePhase } = useSelector((state) => state.gameStatus)
	const { txInProcess, sendTransaction } = useTransaction(bet)
	const { balance } = useSelector((state) => state.userDataWallet)
	const { goUp, goDown } = useGetPhrases(['goUp', 'goDown'])

	const handlerPlaceBet = () => {
		sendTransaction(type).then(r => console.log('Success sendTransaction! ' + r)).catch((e) => console.log(new Error('Error in sendTransaction: ' + e)))
		if (onClick) onClick()

		if (navigator.vibrate !== undefined) {
			navigator.vibrate(500)
		}
	}

	const disabled = !wallet || (gamePhase !== 1 && gamePhase !== 0) || !(balance >= minBet)
	const textButton = txInProcess ? 'Loading ...' : type === 'up' ? goUp : goDown

	return (
		<Button
			type='bet'
			className={cx('button-placebet', type, 'p', { 'disabled': disabled })}
			onClick={() => !wallet ? tonConnectUI.openModal() : handlerPlaceBet()}
			disabled={disabled}
		>
			{textButton}
		</Button>
	)
}
