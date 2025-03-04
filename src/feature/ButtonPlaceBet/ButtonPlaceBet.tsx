import { useContext } from 'react'
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { useTransaction, useGetPhrases, useSelector } from '../../hooks'
import { Button, minBet } from '../../shared'

import { INotificationContextTypes } from '../../app/providers/types'
import { NotificationContext } from '../../app/contexts'

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
	const {
		goUp, goDown, topUpYourWallet, connectYourTON, theRoundHasAlready
	} = useGetPhrases([
		'goUp', 'goDown', 'topUpYourWallet', 'connectYourTON', 'theRoundHasAlready'
	])
	const { openHandler: openHandlerNotification } = useContext<INotificationContextTypes>(NotificationContext)

	const handlerPlaceBet = () => {
		if (!wallet) {
			tonConnectUI.openModal()
					.then(() => openHandlerNotification('warning', { text: connectYourTON }))
		}
		else if (!(Number(balance) >= minBet)) openHandlerNotification('warning', { text: topUpYourWallet })
		else if ((gamePhase !== 1 && gamePhase !== 0)) openHandlerNotification('warning', { text: theRoundHasAlready })
		else {
			sendTransaction(type)
				.then(() => console.log('Success sendTransaction!'))
				.catch((e) => console.log(new Error('Error in sendTransaction: ' + e)))

			if (onClick) onClick()

			if (navigator.vibrate !== undefined) {
				navigator.vibrate(500)
			}
		}
	}

	const textButton = txInProcess ? 'Loading ...' : type === 'up' ? goUp : goDown

	return (
		<Button
			type='bet'
			className={cx('button-placebet', type, 'p', { 'disabled': (gamePhase !== 1 && gamePhase !== 0) })}
			onClick={handlerPlaceBet}
		>
			{textButton}
		</Button>
	)
}
