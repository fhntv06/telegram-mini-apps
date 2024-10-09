import React from 'react'
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonChangeMode.module.scss'

const cx = classNames.bind(styles)

interface Props {
	isActive?: boolean,
	onClick: React.Dispatch<React.SetStateAction<boolean>> | ((event: React.MouseEvent<HTMLElement>) => void)
	text: string,
	className?: string
}

export const ButtonChangeMode = ({
	isActive = false,
	onClick,
	text = '$BTC, 30s',
	className,
}: Props) => {
	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName='bitcoin'
			iconRightName={isActive ? 'arrow-up' : 'arrow-down'}
			sizeIcons='small'
			sizeRightIcon='small'
			onClick={onClick}
		>
			{text}
		</Button>
	)
}