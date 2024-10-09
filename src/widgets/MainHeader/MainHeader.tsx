import { useContext } from 'react';
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'

import styles from './MainHeader.module.scss'

import { ModalContext } from '../../app/contexts'
import { ModalContextTypes } from '../../app/providers/types'
import { ButtonChangeMode, ButtonWallet, ButtonBurger } from '../../feature/'

const cx = classNames.bind(styles)

export const MainHeader = () => {
	const { wallet, balance } = useSelector((state: any) => state.user)
	const { openModalHandler } = useContext<ModalContextTypes>(ModalContext)

	return (
		<header className={cx('header')}>
			<div className={cx('header__button')}>
				<ButtonChangeMode text='$BTC, 30s' onClick={() => openModalHandler('select__mode')} />
				{wallet && <ButtonWallet balance={balance} onClick={() => openModalHandler('wallet')} />}
			</div>
			<ButtonBurger onClick={() => openModalHandler('burger')} />
		</header>
	)
}