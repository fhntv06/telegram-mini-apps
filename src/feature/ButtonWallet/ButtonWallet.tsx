import { useSelector } from 'react-redux'
import React from 'react'
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonWallet.module.scss'

import { formatNumber } from '../../shared/utils'


const cx = classNames.bind(styles)

interface Props {
	isActive?: boolean
	onClick?: React.Dispatch<React.SetStateAction<boolean>> | ((event: React.MouseEvent<HTMLElement>) => void)
	className?: string,
}

export const ButtonWallet = ({
	// isActive = false,
	onClick,
	className
}: Props) => {
	const { tons } = useSelector((state: any) => state.user)

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