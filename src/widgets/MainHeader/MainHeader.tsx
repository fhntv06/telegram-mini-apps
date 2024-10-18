import { useContext } from 'react';
import { useTonWallet } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'

import styles from './MainHeader.module.scss'

import { ModalContext, NotificationContext } from '../../app/contexts'
import { ModalContextTypes, NotificationContextTypes } from '../../app/providers/types'
import { ButtonChangeMode, ButtonWallet, ButtonBurger } from '../../feature/'

const cx = classNames.bind(styles)

export const MainHeader = () => {
  const wallet = useTonWallet()
	const { openHandler } = useContext<NotificationContextTypes>(NotificationContext)
	// const { openHandler } = useContext<ModalContextTypes>(ModalContext)

	return (
		<header className={cx('header')}>
			<div className={cx('header__button')}>
				<ButtonChangeMode onClick={() => openHandler('wins')} />
				{wallet && <ButtonWallet onClick={() => openHandler('wallet')} />}
			</div>
			<ButtonBurger onClick={() => openHandler('burger')} />
		</header>
	)
}