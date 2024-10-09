import React from 'react'
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonBurger.module.scss'

const cx = classNames.bind(styles)

interface Props {
	isActive?: boolean,
	onClick?: React.Dispatch<React.SetStateAction<boolean>> | ((event: React.MouseEvent<HTMLElement>) => void)
	className?: string
}

export const ButtonBurger = ({
	isActive = false,
	onClick,
	className,
}: Props) => {

	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName={isActive ? 'cross' : 'burger'}
			onClick={onClick}
		></Button>
	)
}