import WebApp from '@twa-dev/sdk'
import {useContext, useState} from 'react'
import classNames from 'classnames/bind'
import { postDataBetDetailsPlayers } from '../../app/api'
import { IAnimationContextTypes, INotificationContextTypes } from '../../app/providers/types'
import { AnimationContext, NotificationContext } from '../../app/contexts'
import { useGetPhrases, useSelector, useSetBalance, useOpenInvoice } from '../../hooks'
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
	const { bet } = useSelector((state) => state.bets)
	const { gamePhase } = useSelector((state) => state.gameStatus)
	const [txInProcess, setTxInProcess] = useState<boolean>(false)
	const { openInvoice } = useOpenInvoice()
	const { balance } = useSelector((state) => state.userDataWallet)
	const {
		goUp, goDown, topUpYourStars, theRoundHasAlready
	} = useGetPhrases([
		'goUp', 'goDown', 'topUpYourWallet', 'connectYourTON', 'theRoundHasAlready'
	])
	const { openHandler: openHandlerNotification } = useContext<INotificationContextTypes>(NotificationContext)
	const { openHandler: openHandlerAnimation } = useContext<IAnimationContextTypes>(AnimationContext)
	const { updateBalance } = useSetBalance()

	const disabled = (gamePhase !== 1 && gamePhase !== 0)

	const handlerPlaceBet = () => {
		if (!(Number(balance) >= minBet)) {
			openHandlerNotification('warning', { text: topUpYourStars })
			openInvoice(bet)
		}
		else if (disabled) openHandlerNotification('warning', { text: theRoundHasAlready })
		else {
			if (navigator.vibrate) {
				navigator.vibrate(500)
			}

			setTxInProcess(true)

			const data = {
				ticker: 'BTC-30',
				gameMode: 'STARS_GAME',
				betAmount: bet,
				variantBet: type,
				initData: WebApp.initData
			}

			postDataBetDetailsPlayers(data)
				.then(() => {
					openHandlerAnimation('youAreIn')
					updateBalance()
				})
				.catch(() => {
					new Error("Error in postDataBetDetailsPlayers for ButtonPlaceBet")
				})
				.finally(() => setTxInProcess(false))

			if (onClick) onClick()
		}
	}

	const textButton = txInProcess ? 'Loading ...' : type === 'up' ? goUp : goDown

	return (
		<Button
			type='bet'
			className={cx('button-placebet', type, 'p', { 'disabled': disabled || !bet })}
			onClick={handlerPlaceBet}
		>
			{textButton}
		</Button>
	)
}
