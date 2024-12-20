import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { getGameBetsResult } from '../../app/api/'
import { ButtonPlaceBet } from '../../feature'
import { useGetPhrases } from '../../hooks'
import { IDataPanel } from './types'
import { Counter, Icon, Person, formatIntTonNumber } from '../../shared'

import styles from './BetPanel.module.scss'

const cx = classNames.bind(styles)

interface Props {
	data: IDataPanel
	type?: 'up' | 'down'
}

export const BetPanel = ({ data, type='up' }: Props) => {
	const { gamePhase } = useSelector((state: any) => state.gameStatus)
	const [groupWins, setGroupWins] = useState<'up' | 'down'>('up')
	const { bets, betPool } = data
	const count = bets.length - 5
	const [completedRound, setCompletedRound] = useState<boolean>(false)
	const [betsWiningPool, setWiningPool] = useState<number>(0)
	const { ticker, gameMode } = useSelector((state: any) => state.modeSettings)
	const { up, down, winners, losers } = useGetPhrases(['up', 'down', 'winners', 'losers'])

	useEffect(() => {
		if (gamePhase === 4) {
			getGameBetsResult(`ticker=${ticker}&gameMode=${gameMode}`)
				.then((res) => {
					setWiningPool(res.data.winingPoolEnd)
					setGroupWins(res.data.gameResult > 0 ? 'up' : 'down')
					setCompletedRound(true)
				})
				.catch((error) => new Error('Error: ' + error))
		}
		if (gamePhase === 0) setCompletedRound(false)
	}, [gamePhase])

	return (
		<div className={cx('panel', { 'panel__result': completedRound, 'wins': type === groupWins, 'lose': type !== groupWins })}>
			{
				completedRound ? (
					<>
						<p className={cx('p-small')}>{`${type === 'up' ? up : down} ${type === groupWins ? winners : losers}`}</p>
						<div className={cx('panel__result__text')}>
							<Icon name='ton' size='big'/>
							<Counter value={betsWiningPool} className='h1' direction={type === groupWins ? 'up' : 'down'} />
						</div>
					</>
				) : (
					<>
						<div className={cx('panel__data')}>
							<div className={cx('panel__data__players')}>
								<p className={cx('players__total', 'p p-small')}>
									<Icon name='persons-medium'/>
									{bets.length}
								</p>
								<p className={cx('players__total', 'p-small', type)}>
									<Icon name='ton-medium' size='medium' />
									{formatIntTonNumber(betPool)}
								</p>
							</div>
							<div className={cx('panel__data__persons')}>
								{bets.slice(0, 5).map((betsItem, index) => <Person key={`${betsItem.img}_${index}`} data={betsItem} />)}
								{count > 0 && <p className={cx('panel__persons__count')}><span>{`+${count}`}</span></p>}
							</div>
						</div>
						{!completedRound && <ButtonPlaceBet type={type} />}
					</>
			)
		}
		</div>
	)
}
