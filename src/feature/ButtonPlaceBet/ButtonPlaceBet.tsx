import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonPlaceBet.module.scss'

const cx = classNames.bind(styles)

interface Props {
	onClick: () => void,
	type?: 'up' | 'down'
}

export const ButtonPlaceBet = ({
	onClick,
	type = 'up',
}: Props) => {
	return (
		<Button type='bet' className={cx('button-placebet', type, 'p')} onClick={onClick}>GO {type}</Button>
	)
}