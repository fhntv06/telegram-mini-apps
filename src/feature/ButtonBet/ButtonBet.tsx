import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonBet.module.scss'

const cx = classNames.bind(styles)

interface Props {
	onClick: () => void,
	type?: 'up' | 'down'
}

export const ButtonBet = ({
	onClick,
	type = 'up',
}: Props) => {
	return (
		<Button type='bet' className={cx('button-bet', type, 'p')} onClick={onClick}>GO {type}</Button>
	)
}