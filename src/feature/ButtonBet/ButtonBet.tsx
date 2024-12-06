import { useDispatch } from 'react-redux';
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonBet.module.scss'
import { setBet } from '../../app/store/slices'

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
	const dispatch = useDispatch()

	const handlerBet = () => {
		onClick()

		dispatch(
			setBet({ bet })
		);
	}

	return (<Button className={cx('button', 'p', className)} type='gray' onClick={handlerBet}>{bet}</Button>)
}
