import { useContext } from 'react';
import { useTonWallet } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'

import styles from './MainHeader.module.scss'

import { ModalContext } from '../../app/contexts'
import { ModalContextTypes } from '../../app/providers/types'
import { ButtonChangeMode, ButtonWallet, ButtonBurger } from '../../feature/'

const cx = classNames.bind(styles)

export const MainHeader = () => {
  const wallet = useTonWallet()
	const { openModalHandler } = useContext<ModalContextTypes>(ModalContext)

	return (
		<header className={cx('header')}>
			<div className={cx('header__button')}>
				<ButtonChangeMode onClick={() => openModalHandler('select__mode')} />
				{!wallet && <ButtonWallet onClick={() => openModalHandler('wallet')} />}
			</div>
			<ButtonBurger onClick={() => openModalHandler('burger')} />
		</header>
	)
}