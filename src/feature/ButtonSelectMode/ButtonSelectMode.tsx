import { useSelector } from 'react-redux'
import { Button, isDemoMode } from '../../shared'
import classNames from 'classnames/bind'

import styles from './ButtonSelectMode.module.scss'

const cx = classNames.bind(styles)

interface Props {
	isActive?: boolean,
	onClick?: (() => void)
	className?: string
}

export const ButtonSelectMode = ({
	isActive = false,
	onClick,
	className,
}: Props) => {
	const { gameMode } = useSelector((state: any) => state.modeSettings)
	const textMode = '$BTC, 30s'

	return (
		<Button
			className={cx('button', { 'demo': gameMode === isDemoMode }, className)}
			type='gray'
			iconLeftName='bitcoin-medium'
			iconRightName={isActive ? 'arrow-up-medium' : 'arrow-down-medium'}
			onClick={onClick}
		>
			{(gameMode === isDemoMode && <p className={cx('h2', 'demo-text')}>{isDemoMode}</p>)}
			{textMode}
		</Button>
	)
}
