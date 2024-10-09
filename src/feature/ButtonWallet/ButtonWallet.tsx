import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonWallet.module.scss'

import { formatNumber } from '../../shared/utils'

const cx = classNames.bind(styles)

interface Props {
	isOpen: boolean
	onClick: () => void,
	className?: string,
}

export const ButtonWallet = ({
	isOpen = false,
	onClick,
	className
}: Props) => {
	const tons = 23

	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName="ton"
			iconRightName="plus"
			sizeIcons='medium'
			onClick={onClick}
		>
			{formatNumber(tons)}
		</Button>
	)
}