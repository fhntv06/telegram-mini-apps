import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonChangeMode.module.scss'

const cx = classNames.bind(styles)

interface Props {
	isActive?: boolean,
	onClick?: (() => void)
	className?: string
}

export const ButtonChangeMode = ({
	isActive = false,
	onClick,
	className,
}: Props) => {
	const textMode = '$BTC, 30s'

	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName='bitcoin-medium'
			iconRightName={isActive ? 'arrow-up-medium' : 'arrow-down-medium'}
			onClick={onClick}
		>
			{textMode}
		</Button>
	)
}