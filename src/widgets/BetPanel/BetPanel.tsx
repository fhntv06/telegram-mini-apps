import classNames from 'classnames/bind'
import styles from './BetPanel.module.scss'
import { ButtonPlaceBet } from '../../feature'
import { IDataPanel } from './types'
import { Icon, Person } from '../../shared'

const cx = classNames.bind(styles)

interface Props {
	data: IDataPanel
	type?: 'up' | 'down'
}

export const BetPanel = ({ data, type = 'up' }: Props) => {
	const handlerBet = () => {
		console.log('Bet is ', type)
	}

	const { persons, tonTotal } = data;

	const count = persons.length - 5

	return (
		<div className={cx('panel')}>
			<div className={cx('panel__data')}>
				<div className={cx('panel__data__players')}>
					<p className={cx('players__total', 'p p-small')}>
						<Icon name='persons' />
						{persons.length}
					</p>
					<p className={cx('players__total', 'p p-small', type)}>
						<Icon name='ton' />
						{tonTotal}
					</p>
				</div>
				<div className={cx('panel__data__persons')}>
					{persons.slice(0, 5).map((person, index) => (<Person key={person.name + index} data={person} />))}
					{count > 0 && <p className={cx('panel__persons__count')}>{`+${count}`}</p>}
				</div>
			</div>
			<ButtonPlaceBet type={type} onClick={handlerBet} />
		</div>
	)
}