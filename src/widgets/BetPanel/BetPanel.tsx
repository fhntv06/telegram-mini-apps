import classNames from 'classnames/bind'
import styles from './BetPanel.module.scss'
import { ButtonPlaceBet } from '../../feature'
import { IDataPanel } from './types'
import { Icon, Person } from '../../shared'
import { formatIntTonNumber } from '../../shared/utils'
const cx = classNames.bind(styles)

interface Props {
	data: IDataPanel
	type?: 'up' | 'down'
}

const titleResultPanel = {
	up: 'UP WINNER',
	down: 'DOWN WINNER'
}

export const BetPanel = ({ data, type = 'up' }: Props) => {
	const handlerBet = () => {
		console.log('Bet is ', type)
	}

	const completedRound = true

	const { personsImg, betPool } = data;

	const count = personsImg.length - 5

	return (
		<div className={cx('panel')}>
			{
				completedRound ? (
					<div className={cx('panel__result')}>
							<p className={cx('panel__result__title')}>{titleResultPanel[type]}</p>
							<p className={cx('panel__result__text')}>
								<Icon name='ton' />
								{betPool}
							</p>
					</div>
				) : (
					<div className={cx('panel__data')}>
						<div className={cx('panel__data__players')}>
							<p className={cx('players__total', 'p p-small')}>
								<Icon name='persons' />
								{personsImg.length}
							</p>
							<p className={cx('players__total', 'p p-small', type)}>
								<Icon name='ton' />
								{formatIntTonNumber(betPool)}
							</p>
						</div>
						<div className={cx('panel__data__persons')}>
							{personsImg.slice(0, 5).map((img) => (<Person key={img} img={img} />))}
							{count > 0 && <p className={cx('panel__persons__count')}><span>{`+${count}`}</span></p>}
						</div>
					</div>
				)
			}

			<ButtonPlaceBet type={type} onClick={handlerBet} />
		</div>
	)
}