import { useDispatch } from 'react-redux';
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonBet.module.scss'
import { setBet } from '../../app/store/slices/bets'

const cx = classNames.bind(styles)

interface Props {
	bet: number,
	className?: string,
}

export const ButtonBet = ({
	bet,
	className,
}: Props) => {
	const dispatch = useDispatch()

	const handlerBet = () => {
		dispatch(setBet({ bet }))
	}

	return (<Button className={cx('button', 'p', className)} type='gray' onClick={handlerBet}>{bet}</Button>)
}
