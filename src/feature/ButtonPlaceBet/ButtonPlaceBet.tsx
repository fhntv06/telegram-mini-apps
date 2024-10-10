import { useSelector } from 'react-redux'
import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonPlaceBet.module.scss'
import { useTransaction } from '../../hooks';

const cx = classNames.bind(styles)

interface Props {
	onClick?: () => void,
	type?: 'up' | 'down'
}

export const ButtonPlaceBet = ({
	onClick,
	type = 'up',
}: Props) => {
	const { bet } = useSelector((state: any) => state.bets)
	const { wallet } = useSelector((state: any) => state.user)
	const { txInProcess, sendTransaction } = useTransaction(bet)

	const handlerPlaceBet = async () => {
		console.log({
			bet,
			wallet
		})

		if (!bet) {
			alert('Выберите ставку!')
		} else if (!wallet) {
			alert('Подключите кошелек!')
		} else {
			sendTransaction(type)
			if (onClick) onClick()
		}
	}

	const disabled = !bet || !wallet
	const textButton = txInProcess ? 'Loading ...' : `GO ${type}`

	return (
		<Button
			type='bet'
			className={cx('button-placebet', type, 'p', { 'disabled': !bet })}
			onClick={handlerPlaceBet}
			disabled={disabled}
		>
			{textButton}
		</Button>
	)
}