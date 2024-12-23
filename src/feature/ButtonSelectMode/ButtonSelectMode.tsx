import classNames from 'classnames/bind'
import { useSelector } from '../../hooks'
import { Button, isDemoMode } from '../../shared'

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
	const { gameMode } = useSelector((state) => state.modeSettings)
	const textMode = '$BTC,\u00A030s'

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
