import classNames from 'classnames/bind'
import styles from './MainFooter.module.scss'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import { Icon, Rounds } from '../../shared'
import { IMainFooter } from './types'

import { formatNumber } from '../../shared/utils'

const cx = classNames.bind(styles)

interface Props {
	data: IMainFooter
}

export const MainFooter = ({ data }: Props) => {
	const { dataUp, dataDown, liveLayers, allTimeWins } = data;

	return (
		<footer className={cx('footer')}>
			<header className={cx('footer__header')}>
				<div>
					<h2>LIVE PLAYERS</h2>
					<p>{formatNumber(liveLayers)}</p>
				</div>
				<div>
					<h2>ALL TIME WINS</h2>
					<p className={cx('footer__header__time-wins')}>
						<Icon name='ton' />
						{formatNumber(allTimeWins)}
					</p>
				</div>
				<div>
					<h2>LAST 3 ROUNDS</h2>
					<div className={cx('footer__header__rounds')}>
						{data.rounds.slice(0, 3).map(({ status }) => (<Rounds status={status} />))}
					</div>
				</div>
			</header>
			<main className={cx('footer__main')}>
				<BetPanel data={dataUp} />
				<BetPanel data={dataDown} type='down' />
			</main>
			<footer className={cx('footer__bets')}>
				<PanelButtonsBet />
			</footer>
		</footer>
	)
}