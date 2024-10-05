import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonWallet.module.scss'

import { formatNumber } from '../../shared/utils'

const cx = classNames.bind(styles)

interface Props {
    onClick: () => void
}

export const ButtonWallet = ({
    onClick,
}: Props) => {
	const tons = 23

	return (
		<Button
			className={cx('button', '')}
			type='gray'
			iconLeftName="ton"
			iconRigthName="plus"
			sizeIcons='medium'
			onClick={onClick}
		>
			{formatNumber(tons)}
		</Button>
	)
}