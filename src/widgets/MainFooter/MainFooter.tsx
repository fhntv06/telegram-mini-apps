import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import { getBalance } from '../../app/api'
import { setUser } from '../../app/store/slices/user'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import { ButtonConnectWallet } from '../../feature'
import { useGetPhrases } from '../../hooks'
import { Icon, Rounds } from '../../shared'
import { IRoundsType } from '../../shared/types'
import { formatNumber } from '../../shared/utils'

import { getCorrectBalanceWithFormatNumber } from '../../shared/utils'

import styles from './MainFooter.module.scss'

const cx = classNames.bind(styles)

export const MainFooter = () => {
	const dispatch = useDispatch()
	const {
		upPoolData,
		downPoolData,
		last3GamesRes,
		livePlayers: livePlayersCount,
		allTimeWins: allTimeWinsCount 
	} = useSelector((state: any) => state.gameStatus)
  const wallet = useTonWallet()
	const address = useTonAddress()
	const { gamePhase } = useSelector((state: any) => state.gameStatus)

  // @ts-ignore
  const { livePlayers, last3rounds, allTimeWins } = useGetPhrases(['livePlayers', 'last3rounds', 'allTimeWins'])

	const setDataUser = async () => {
		if (wallet) {
			// TODO: Это убрать в кнопку подключения и перенести в отдельный хук
			const balance = await getBalance(address)
				.then(res => res.data.balance)
				.then((balance) => balance)
				.catch((error) => new Error(error))

			console.log('getBalance = new balance', balance)

			dispatch(
				setUser({
					wallet,
					chain: wallet.account.chain,
					publicKey: wallet.account.publicKey,
					address,
					appName: wallet.device.appName,
					appVersion: wallet.device.appVersion,
					maxProtocolVersion: wallet.device.maxProtocolVersion,
					platform: wallet.device.platform,
					balance
				})
			)
		}
	}

	useEffect(() => {
		setDataUser()
	}, [wallet])

	useEffect(() => {
		if (gamePhase === 3 || gamePhase === 0) setDataUser()
	}, [gamePhase])

	return (
		<footer className={cx('footer')}>
			<header className={cx('footer__header')}>
				<div>
					<h2>{livePlayers}</h2>
					<p>{formatNumber(livePlayersCount)}</p>
				</div>
				<div className={cx('footer__header__time-wins')}>
					<h2>{allTimeWins}</h2>
					<p>
						<Icon name='ton' size='medium' />
						{getCorrectBalanceWithFormatNumber(allTimeWinsCount)}
					</p>
				</div>
				<div>
					<h2>{last3rounds}</h2>
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
				<ButtonConnectWallet className={cx({ 'hide': wallet })} sizeIcons='big' />
			</footer>
		</footer>
	)
}