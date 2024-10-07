import classNames from 'classnames/bind'
import styles from './MainFooter.module.scss'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import { ButtonConnectWallet } from '../../feature'
import { Icon, Rounds } from '../../shared'
import { GameStatusContext } from '../../app/contexts'
import { useIsConnectionRestored, useTonWallet } from '@tonconnect/ui-react'

import { formatNumber } from '../../shared/utils'
import { useContext, useEffect } from 'react'

const cx = classNames.bind(styles)

export const MainFooter = () => {
	const { upPoolData, downPoolData, livePlayers, allTimeWins } = useContext(GameStatusContext);

	console.log({ upPoolData, downPoolData, livePlayers, allTimeWins })

  const isConnectionRestored = useIsConnectionRestored()
  const wallet = useTonWallet()

	const handlerConnectWallet = () => {
		console.log('Run wallet connect!')
	}

	useEffect(() => {
		if (wallet) {
			// данные о кошельке в store
			// {wallet.account.chain}
			// {wallet.account.publicKey}
			// {wallet.account.address}
			// {wallet.device.appName}
			// {wallet.device.appVersion}
			// {wallet.device.maxProtocolVersion}
			// {wallet.device.platform}
		}
	}, [wallet])

	console.log("wallet: ", wallet)
  console.log('isConnectionRestored ', isConnectionRestored)

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
						{data.last3GamesRes.slice(0, 3).map(({  }) => (<Rounds key={id} status={status} />))}
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