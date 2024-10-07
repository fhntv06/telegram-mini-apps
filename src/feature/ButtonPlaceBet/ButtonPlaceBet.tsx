import { useSelector } from 'react-redux'
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonPlaceBet.module.scss'
import { useTransaction } from '../../hooks';

const cx = classNames.bind(styles)

interface Props {
	onClick: () => void,
	type?: 'up' | 'down'
}

export const ButtonPlaceBet = ({
	onClick,
	type = 'up',
}: Props) => {
	const { bet } = useSelector((state: any) => state.bets);
	const { txInProcess, sendTransaction } = useTransaction(bet)

	const handlerPlaceBet = () => {
		if (!bet) {
			alert('Выберите ставку!')
		} else {
			sendTransaction()
			onClick()
		}
	}

	const textButton = txInProcess ? 'Loading ...' : `GO ${type}`;

	return (
		<Button
			type='bet'
			className={cx('button-placebet', type, 'p', { 'disabled': !bet })}
			onClick={handlerPlaceBet}
			disabled={bet}
		>
			{textButton}
		</Button>
	)
}