import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import styles from './MainHeader.module.scss'

import { useModal } from '../../hooks'

import {
	ButtonChangeMode,
	ButtonWallet,
	ButtonBurger
} from '../../feature/'

const cx = classNames.bind(styles)

export const MainHeader = () => {
	const { wallet } = useSelector((state: any) => state.user);

	const {
		// isOpen: isOpenWallet,
		openModalHandler: openWallet,
		closeModalHandler: closeWallet,
	  } = useModal();

	const {
		// isOpen: isOpenModalAuth,
		openModalHandler: openModalAuth,
		closeModalHandler: closeModalAuth,
		} = useModal();

	const handlerChangeMode = () => {
		console.log('change mode')
	}
	const handlerModalAuth = () => {
		openModalAuth()
		console.log('show modal');

		setTimeout(closeModalAuth, 1000);
	}

	const handlerWallet = () => {
		openWallet()
		console.log('show wallet');

		setTimeout(closeWallet, 1000);
	}

	return (
		<header className={cx('header')}>
			<div className={cx('header__button')}>
				<ButtonChangeMode onClick={handlerChangeMode} />
				{wallet && <ButtonWallet onClick={handlerWallet} />}
			</div>
			<ButtonBurger onClick={handlerModalAuth} />
		</header>
	)
}