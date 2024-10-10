import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react'

import styles from './MainFooter.module.scss'

import { getBalance } from '../../app/api'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import { Icon, Rounds } from '../../shared'
import { IRoundsType } from '../../shared/types'
import { formatNumber, setStorage, formatIntTonNumber, getCorrectBalance } from '../../shared/utils'

import { setUser } from '../../app/store/slices/user'

const cx = classNames.bind(styles)

export const MainFooter = () => {
	const dispatch = useDispatch()
	const {
		upPoolData,
		downPoolData,
		last3GamesRes,
		livePlayers,
		allTimeWins
	} = useSelector((state: any) => state.gameStatus)
  const wallet = useTonWallet()

	useEffect(() => {
		if (wallet) {
			getBalance(wallet.account.address)
				.then(res => res.data.balance)
				.then((balance) => {
					setStorage('address', wallet.account.address)
					dispatch(
						setUser({
							wallet,
							chain: wallet.account.chain,
							publicKey: wallet.account.publicKey,
							address: wallet.account.address,
							appName: wallet.device.appName,
							appVersion: wallet.device.appVersion,
							maxProtocolVersion: wallet.device.maxProtocolVersion,
							platform: wallet.device.platform,
							balance: formatIntTonNumber(balance)
						})
					)
				})
				.catch((error) => new Error(error))
		}
	}, [wallet])

	return (
		<footer className={cx('footer')}>
			<header className={cx('footer__header')}>
				<div>
					<h2>LIVE PLAYERS</h2>
					<p>{formatNumber(livePlayers)}</p>
				</div>
				<div className={cx('footer__header__time-wins')}>
					<h2>ALL TIME WINS</h2>
					<p>
						<Icon name='ton' />
						{getCorrectBalance(allTimeWins)}
					</p>
				</div>
				<div>
					<h2>LAST 3 ROUNDS</h2>
					<div className={cx('footer__header__rounds')}>
						{last3GamesRes.map((countType: IRoundsType, index: number) => <Rounds key={`${countType}_${index}`} countType={countType} />)}
					</div>
				</div>
			</header>
			<main className={cx('footer__main')}>
				<BetPanel data={upPoolData} />
				<BetPanel data={downPoolData} type='down' />
			</main>
			<footer className={cx('footer__bets')}>
				{wallet && <PanelButtonsBet/>}
				{/* hide button, because delete button execute error */}
				<TonConnectButton className={cx('button', 'p', { hide: wallet })}/>
			</footer>
		</footer>
	)
}