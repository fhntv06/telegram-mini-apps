import { useState } from 'react'
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonBet.module.scss'

const cx = classNames.bind(styles)

interface Props {
	bet: number,
	className?: string,
	onClick: () => void
}

export const ButtonBet = ({
	bet,
	className,
	onClick,
}: Props) => {
	const handlerBet = ()=> {
		onClick()
	}

	return (<Button className={cx('button', 'p', className)} type='gray' onClick={handlerBet}>{bet}</Button>)
}