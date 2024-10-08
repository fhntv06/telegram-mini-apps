import {
	// useContext,
	useEffect
} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames/bind'
import styles from './MainFooter.module.scss'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import { ButtonConnectWallet } from '../../feature'
import { Icon, Rounds } from '../../shared'
import { IRoundsType } from '../../shared/types'
// import { GameStatusContext } from '../../app/contexts'
import { useTonWallet } from '@tonconnect/ui-react'

import { formatNumber, setStorage } from '../../shared/utils'

import { setUser } from '../../app/store/slices/user'

const cx = classNames.bind(styles)

export const MainFooter = () => {
	const dispatch = useDispatch()
	const { upPoolData, downPoolData, last3GamesRes, livePlayers, allTimeWins } = useSelector((state: any) => state.gameStatus) // useContext(GameStatusContext);

  const wallet = useTonWallet()

	const handlerConnectWallet = () => {
		console.log('Run wallet connect!')
	}

	useEffect(() => {
		if (wallet) {
			alert(`Your address: ${wallet.account.address}`)

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
				})
			)
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
						{formatNumber(allTimeWins)}
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
				{
					wallet
						? <PanelButtonsBet />
						: <ButtonConnectWallet onClick={handlerConnectWallet} />
				}
			</footer>
		</footer>
	)
}