import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import classNames from 'classnames/bind'
import { ButtonPlaceBet } from '../../feature'
import { useGetPhrases } from '../../hooks'
import { IDataPanel } from './types'
import {Counter, Icon, Person} from '../../shared'
import { formatIntTonNumber } from '../../shared/utils'

import styles from './BetPanel.module.scss'

const cx = classNames.bind(styles)

interface Props {
	data: IDataPanel
	type: 'up' | 'down'
}

export const BetPanel = ({ data, type }: Props) => {
	const [groupWins, setGroupWins] = useState<'up' | 'down'>()
	const { gamePhase, startBtcPrice, btcPrice, upPoolData, downPoolData } = useSelector((state: any) => state.gameStatus)
	const { playersImg, betPool } = data
	const count = playersImg.length - 5
	const completedRound = gamePhase === 4

	// @ts-ignore
	const { up, down, winners, losers } = useGetPhrases(['up', 'down', 'winners', 'losers'])

	useEffect(() => {
		if (gamePhase === 4) {
			setGroupWins(btcPrice - startBtcPrice > 0 ? 'up' : 'down')
		}
	}, [gamePhase])

	// TODO: надписи вынести для перевода
	// упростить использование условия type === groupWins
	return (
		<div className={cx('panel', { 'panel__result': completedRound, 'wins': type === groupWins, 'lose': type !== groupWins })}>
			{
				completedRound ? (
					<>
						<p className={cx('p-small')}>{`${type === 'up' ? up : down} ${type === groupWins ? winners : losers}`}</p>
						<div className={cx('panel__result__text')}>
							<Icon name='ton' size='big'/>
							<Counter value={(upPoolData.betPool + downPoolData.betPool) * 0.95} className='h1' direction={type === groupWins ? 'up' : 'down'} />
						</div>
					</>
				) : (
					<>
						<div className={cx('panel__data')}>
							<div className={cx('panel__data__players')}>
								<p className={cx('players__total', 'p p-small')}>
									<Icon name='persons'/>
									{playersImg.length}
								</p>
								<p className={cx('players__total', 'p p-small', type)}>
									<Icon name='ton' size='medium' />
									{formatIntTonNumber(betPool)}
								</p>
							</div>
							<div className={cx('panel__data__persons')}>
								{playersImg.slice(0, 5).map((img: string, index) => <Person key={`${img}_${index}`} img={img} />)}
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