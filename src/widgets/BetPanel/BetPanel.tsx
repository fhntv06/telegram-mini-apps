// import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './BetPanel.module.scss'
import { ButtonPlaceBet } from '../../feature'
import { IDataPanel } from './types'
import { Icon, Person } from '../../shared'
import { formatIntTonNumber } from '../../shared/utils'
// import { GameStatusContext } from "../../app/contexts";
import {useSelector} from "react-redux";
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
	const { gamePhase } = useSelector((state: any) => state.gameStatus)
	const completedRound = gamePhase === 3
	const { playersImg, betPool } = data;
	const count = playersImg.length - 5

	return (
		<div className={cx('panel', { 'panel__result': completedRound, [type]: completedRound })}>
			{
				completedRound ? (
					<>
						<p className={cx('p-small')}>{titleResultPanel[type]}</p>
						<h1 className={cx('panel__result__text')}>
							<Icon name='ton' size='big'/>
							{formatIntTonNumber(betPool)}
						</h1>
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
									<Icon name='ton'/>
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