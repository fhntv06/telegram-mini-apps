import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonWallet.module.scss'

import { getCorrectBalance } from '../../shared/utils'

const cx = classNames.bind(styles)

interface Props {
	isActive?: boolean
	onClick?: () => void,
	balance: string | number,
	className?: string,
}

export const ButtonWallet = ({
	// isActive = false,
	onClick,
	balance = '0',
	className
}: Props) => {
	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName="ton"
			iconRightName="plus"
			sizeIcons='medium'
			onClick={onClick}
		>
			{getCorrectBalance(balance)}
		</Button>
	)
}