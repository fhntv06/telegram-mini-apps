import classNames from 'classnames/bind'

import { Icon } from '../../shared'

import styles from './PanelMenu.module.scss'
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles)

interface Props {
	className?: string,
}

export const PanelMenu = ({
	className,
}: Props) => {

	const handlerWalletButton = () => {

	}
	const handlerTasksButton = () => {

	}
	const handlerGameButton = () => {

	}
	const handlerStatsButton = () => {

	}
	const handlerMenuButton = () => {

	}

	return (
		<div className={cx('panel', className)}>
			<NavLink
				to='/wallet'
				className={({ isActive }) => isActive ? cx('item', 'active') : cx('item')}
				onClick={handlerWalletButton}
			>
				<span><Icon className={cx('icon')} name='wallet' size='big'/></span>
				<p className={cx('p-small')}>Wallet</p>
			</NavLink>
			<NavLink
				to='/tasks'
				className={({ isActive }) => isActive ? cx('item', 'active') : cx('item')}
				onClick={handlerTasksButton}
			>
				<span><Icon className={cx('icon')} name='check-tasks' size='big'/></span>
				<p className={cx('p-small')}>Tasks</p>
			</NavLink>
			<NavLink
				to='/'
				className={({ isActive }) => isActive ? cx('item', 'active') : cx('item')}
				onClick={handlerGameButton}
			>
				<span><Icon className={cx('icon')} name='candels' size='big'/></span>
				<p className={cx('p-small')}>Game</p>
			</NavLink>
			<NavLink
				to='/stats'
				className={({ isActive }) => isActive ? cx('item', 'active') : cx('item')}
				onClick={handlerStatsButton}
			>
				<span><Icon className={cx('icon')} name='persons' size='big'/></span>
				<p className={cx('p-small')}>Stats</p>
			</NavLink>
			<NavLink
				to='/menu'
				className={({ isActive }) => isActive ? cx('item', 'active') : cx('item')}
				onClick={handlerMenuButton}
			>
				<span><Icon className={cx('icon')} name='burger' size='big'/></span>
				<p className={cx('p-small')}>Menu</p>
			</NavLink>
		</div>
	)
}
