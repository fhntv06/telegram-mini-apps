import { useId } from 'react'
import classNames from 'classnames/bind'
import styles from './BetPanel.module.scss'
import { ButtonPlaceBet } from '../../feature'
import { IDataPanel } from './types'
import {Icon, Person } from '../../shared'
import {formatIntTonNumber, formatNumber} from '../../shared/utils'
const cx = classNames.bind(styles)

interface Props {
	data: IDataPanel
	type?: 'up' | 'down'
}

const titleResultPanel = {
	up: 'UP WINNER',
	down: 'DOWN WINNER'
}

const IsPerson = (img: string) => <Person key={useId()} img={img} />

export const BetPanel = ({ data, type = 'up' }: Props) => {
	const handlerBet = () => {
		console.log('Bet is ', type)
	}

	const completedRound = false
	const { playersImg, betPool } = data;
	const count = playersImg.length - 5

	return (
		<div className={cx('panel', {'panel__result': completedRound, [type]: completedRound})}>
			<div className={cx('panel__data')}>
				{
					completedRound ? (
						<>
							<p>{titleResultPanel[type]}</p>
							<h1 className={cx('panel__result__text')}>
								<Icon name='ton' size='big'/>
								{formatNumber(betPool)}
							</h1>
						</>
					) : (
						<>
						<div className={cx('panel__data__players')}>
							<p className={cx('players__total', 'p p-small')}>
								<Icon name='persons'/>
								{playersImg.length}
							</p>
							<p className={cx('players__total', 'p p-small', type)}>
								<Icon name='ton'/>
								{formatIntTonNumber(betPool)}
							</p>
						</div>
						<div className={cx('panel__data__persons')}>
							{playersImg.slice(0, 5).map((img: string) => IsPerson(img))}
							{count > 0 && <p className={cx('panel__persons__count')}><span>{`+${count}`}</span></p>}
						</div>
					</>
				)
			}
			</div>
			{!completedRound && <ButtonPlaceBet type={type} onClick={handlerBet}/>}
		</div>
	)
}