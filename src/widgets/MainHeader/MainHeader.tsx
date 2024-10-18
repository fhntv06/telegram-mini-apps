import {useContext, useEffect} from 'react';
import { useSelector } from 'react-redux'
import {useTonAddress, useTonWallet} from '@tonconnect/ui-react'
import classNames from 'classnames/bind'

import styles from './MainHeader.module.scss'

import {AnimationContext, ModalContext, NotificationContext} from '../../app/contexts'
import {AnimationContextTypes, ModalContextTypes, NotificationContextTypes} from '../../app/providers/types'
import { ButtonChangeMode, ButtonWallet, ButtonBurger } from '../../feature/'
import {getWalletBet} from "../../app/api/user";

const cx = classNames.bind(styles)

export const MainHeader = () => {
	const address = useTonAddress()
  const wallet = useTonWallet()
	const { openHandler: openHandlerNotification, setTonsHandler } = useContext<NotificationContextTypes>(NotificationContext)
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)
	const { openHandler: openHandlerAnimation } = useContext<AnimationContextTypes>(AnimationContext)
	const { gamePhase } = useSelector((state: any) => state.gameStatus)

	useEffect(() => {
		if (gamePhase !== 0 && gamePhase !== 1) {
			openHandlerNotification('warning')
		}
		if (gamePhase === 4 && address) {
			getWalletBet(address)
				.then((res) => {
					console.log('res ', res)
					if (res.data.error) {
						throw new Error('Error getWalletBet: res have error')
					}
					if (res.data.win_reward) {
						openHandlerNotification('wins')
						setTonsHandler(res.data.win_reward)
						openHandlerAnimation('wins')
					} else if (res.data.loose) {
						openHandlerNotification('lose')
						setTonsHandler(res.data.loose)
					} else if (res.data.refund) {
						openHandlerNotification('refund')
						setTonsHandler(res.data.refund)
					}
				})
				.catch((error) => {
					openHandlerNotification('wins')
					openHandlerAnimation('wins')
					setTonsHandler(20)
					console.log(error)
				})

			openHandlerNotification('wins')
		}
	}, [gamePhase]);

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