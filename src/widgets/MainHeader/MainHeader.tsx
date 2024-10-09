import React, { useContext } from 'react';
import { useSelector } from 'react-redux'
import { ModalContext } from '../../app/contexts';
import { ModalContextTypes } from '../../app/providers/types'

import classNames from 'classnames/bind'
import styles from './MainHeader.module.scss'

import {
	ButtonChangeMode,
	ButtonWallet,
	ButtonBurger
} from '../../feature/'

const cx = classNames.bind(styles)

export const MainHeader = () => {
	const { wallet } = useSelector((state: any) => state.user);
	const { openModalHandler } = useContext<ModalContextTypes>(ModalContext)

	return (
		<header className={cx('header')}>
			<div className={cx('header__button')}>
				<ButtonChangeMode text='$BTC, 30s' onClick={openModalHandler} />
				{wallet && <ButtonWallet onClick={openModalHandler} />}
			</div>
			<ButtonBurger onClick={openModalHandler} />
		</header>
	)
}