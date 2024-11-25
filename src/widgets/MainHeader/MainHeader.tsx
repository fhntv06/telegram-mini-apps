import {useContext, useEffect} from 'react';
import { useSelector } from 'react-redux'
import {useTonAddress, useTonWallet} from '@tonconnect/ui-react'
import classNames from 'classnames/bind'

import styles from './MainHeader.module.scss'

import { AnimationContext, ModalContext, NotificationContext } from '../../app/contexts'
import { IAnimationContextTypes, ModalContextTypes, INotificationContextTypes } from '../../app/providers/types'
import { ButtonChangeMode, ButtonWallet, ButtonBurger } from '../../feature/'
import { getWalletBet } from '../../app/api/user'
import { useGetPhrases, useUserData } from '../../hooks'

const cx = classNames.bind(styles)

export const MainHeader = () => {
	const address = useTonAddress()
	const wallet = useTonWallet()
	const { openHandler: openHandlerNotification, setTonsHandler } = useContext<INotificationContextTypes>(NotificationContext)
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)
	const { openHandler: openHandlerAnimation } = useContext<IAnimationContextTypes>(AnimationContext)
	const { gamePhase } = useSelector((state: any) => state.gameStatus)
	const { bet } = useSelector((state: any) => state.bets)
	const { ticker, gameMode } = useSelector((state: any) => state.modeSettings)
	const userData = useUserData()
	const { yourAnOutOfTime } = useGetPhrases(['yourAnOutOfTime'])

	// TODO: вынести код выше!
	// не должно быть тут!
	useEffect(() => {
		if (gamePhase === 2) {
			openHandlerNotification('warning', { text: yourAnOutOfTime })
		}
		if (gamePhase === 4 && address && bet && userData?.id) {
			getWalletBet({ address, ticker, gameMode, demoTgId: userData.id })
				.then((res) => {
					console.log('res getWalletBet', res)
					if (res.data.error) {
						throw new Error('Error getWalletBet: res have error')
					}
					if (res.data.winReward) {
						openHandlerNotification('wins')
						setTonsHandler(res.data.winReward)
						openHandlerAnimation('wins')
					} else if (res.data.loose) {
						openHandlerNotification('lose')
						setTonsHandler(res.data.loose)
					} else if (res.data.refund) {
						openHandlerNotification('refund')
						setTonsHandler(res.data.refund)
					}
				})
				.catch((error) => console.log(error))
		}
	}, [gamePhase])

	return (
		<header className={cx('header')}>
			<div className={cx('header__button')}>
				<ButtonChangeMode onClick={() => openHandlerModal('select__mode')} />
				{wallet && <ButtonWallet onClick={() => openHandlerModal('wallet')} />}
			</div>
			<ButtonBurger onClick={() => openHandlerModal('burger')} />
		</header>
	)
}
