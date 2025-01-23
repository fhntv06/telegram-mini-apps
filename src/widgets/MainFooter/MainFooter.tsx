// import WebApp from '@twa-dev/sdk'
import { useContext, useEffect } from 'react'
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import {useGetPhrases,
	useSelector, useSetBalance} from '../../hooks'
import { ButtonConnectWallet, ButtonTopUp } from '../../feature'
import {
	Icon, Rounds, formatNumber,
	minBet,
	// setStorage,
	getStorage,
	// removeStorage,
	getCorrectBalance, maxCountTransactionForShowModalSwitchMode
} from '../../shared'
import { IRoundsType } from '../../shared/types'

import styles from './MainFooter.module.scss'
import { ModalContextTypes } from '../../app/providers/ModalProvider/types'
import { ModalContext } from '../../app/contexts'
import { roundToFixed } from '../../shared/utils/formatNumber'

const cx = classNames.bind(styles)

export const MainFooter = () => {
	const {
		upPoolData,
		downPoolData,
		last3GamesRes,
		livePlayers: livePlayersCount,
	} = useSelector((state) => state.gameStatus)
	const wallet = useTonWallet()
	const address = useTonAddress()
	const { gamePhase } = useSelector((state) => state.gameStatus)
	const { gameMode } = useSelector((state) => state.modeSettings)
	const { multiplierData: { totalMultiplier }, isNewPlayer } = useSelector((state) => state.retrievesData)
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)
  const { players, multiplier, balance, lastGames } = useGetPhrases(['players', 'multiplier', 'balance', 'lastGames'])
	const { balance: userBalance, updateBalance } = useSetBalance()

	useEffect(() => {
		if (wallet) {
			if (
				(isNewPlayer && !getStorage('visibleTestModeModalSelectGameMode')) // для Test mode
				|| (gamePhase === 0 && Number(getStorage('count')) == maxCountTransactionForShowModalSwitchMode && !getStorage('visibleRealModeModalSelectGameMode')) // для Real mode
			) {
				console.log('openHandlerModal switchMode')
				openHandlerModal('switchMode')
			}
		}
	}, [gamePhase, wallet])

	// TODO: вынести код выше!
	// не должно быть тут!
	useEffect(() => {
		if ((gamePhase === 3 || gamePhase === 4) && wallet) {
			updateBalance()
		}
	}, [wallet, gameMode, gamePhase])

	useEffect(() => {
		if (wallet) {
			updateBalance()
		}
	}, [gameMode, wallet])

	// // Когда уже в игре
	// useEffect(() => {
	// 	if (wallet && Number(userBalance / 1000000000) < minBet) {
	// 		if (gamePhase === 0 && !getStorage('dontPayUser')) {
	// 			setStorage('dontPayUser', '1')
	// 		}
	// 	} else {
	// 		removeStorage('dontPayUser')
	// 	}
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [gamePhase, wallet])
	//
	// // Когда заходит в App
	// useEffect(() => {
	// 	if (wallet && Number(userBalance / 1000000000) < minBet) {
	// 		setStorage('dontPayUser', '1')
	// 	} else {
	// 		removeStorage('dontPayUser')
	// 	}
	// }, [wallet])

	return (
		<footer className={cx('footer')}>
			<header className={cx('footer__header')}>
				<div className={cx('footer__header__items')}>
					<h2>{players}</h2>
					<p className='p-medium'>
						<Icon name='persons-medium'/>
						{formatNumber(livePlayersCount)}
					</p>
				</div>
				<div className={cx('footer__header__items')}>
					<h2>{lastGames}</h2>
					<div className={cx('footer__header__rounds')}>
						{last3GamesRes.map((countType: IRoundsType, index: number) => (
							<Rounds key={`${countType}_${index}`} countType={countType}/>
						))}
					</div>
				</div>
				<div className={cx('footer__header__items')}>
					<h2>{multiplier}</h2>
					<p className='p-medium'>×{roundToFixed(totalMultiplier)}</p>
				</div>
				<div className={cx('footer__header__items')}>
					<h2>{balance}</h2>
					<p className='p-medium'>
						<Icon name='ton-medium' size='medium'/>
						{address ? getCorrectBalance(userBalance) : '- -'}
					</p>
				</div>
			</header>
			<main className={cx('footer__main')}>
				<BetPanel data={upPoolData}/>
				<BetPanel data={downPoolData} type='down'/>
			</main>
			<footer className={cx('footer__bets')}>
				{(
					wallet
						? Number(userBalance / 1000000000) < minBet
							? <ButtonTopUp sizeIcons='big' />
							: <PanelButtonsBet />
					: null
				)}
				<ButtonConnectWallet className={cx({ 'hide': wallet })} sizeIcons='big' />
			</footer>
		</footer>
	)
}
