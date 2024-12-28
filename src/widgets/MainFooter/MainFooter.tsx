import WebApp from '@twa-dev/sdk'
import { useCallback, useContext, useEffect } from 'react'
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { getBalance, getDemoBalance } from '../../app/api'
import { setUserDataWallet } from '../../app/store/slices'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import { useGetPhrases, useDispatch, useSelector } from '../../hooks'
import { ButtonConnectWallet, ButtonTopUp } from '../../feature'
import {
	Icon, Rounds, formatNumber,
	isDemoMode, minBet, setStorage, getStorage, removeStorage
} from '../../shared'
import { IRoundsType } from '../../shared/types'

import styles from './MainFooter.module.scss'
import { ModalContextTypes } from "../../app/providers/ModalProvider/types.ts";
import { ModalContext } from "../../app/contexts";

const cx = classNames.bind(styles)

export const MainFooter = () => {
	const dispatch = useDispatch()
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
	const userDataWallet = useSelector((state) => state.userDataWallet)
	const { multiplierData: { totalMultiplier } } = useSelector((state) => state.retrievesData)
	const { isNewPlayer } = useSelector((state) => state.retrievesData)
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)

  const { players, multiplier, balance, lastGames } = useGetPhrases(['players', 'multiplier', 'balance', 'lastGames'])

	const setDataUser = useCallback(() => {
		// TODO: Это убрать в кнопку подключения и перенести в отдельный хук

		if (gameMode === isDemoMode && WebApp.initData) { // с ПК это работать не будет, нужно тестировать только с приложения ТГ
			console.log('execute getDemoBalance')
			getDemoBalance(WebApp.initData)
				.then(res => {
					dispatch(
						setUserDataWallet({
							...userDataWallet,
							balance: res.data.balance,
						})
					)
				})
				.catch((error) => {
					new Error(error)

					return 0
				})
		} else {
			console.log('execute getBalance')
			getBalance(address)
				.then(res => {
					dispatch(
						setUserDataWallet({
							...userDataWallet,
							balance: res.data.balance,
						})
					)
				})
				.catch((error) => {
					new Error(error)

					return 0
				})
		}
	}, [gameMode])

	useEffect(() => {
		if (wallet && isNewPlayer && !getStorage('visibleTestModeModalSelectGameMode')) {
			openHandlerModal('switchMode')
		}
	}, [gamePhase, wallet])

	// TODO: вынести код выше!
	// не должно быть тут!
	useEffect(() => {
		if ((gamePhase === 3 || gamePhase === 4) && wallet) {
			setDataUser()
		}
	}, [wallet, gameMode, gamePhase])

	useEffect(() => {
		if (wallet) {
			setDataUser()
		}
	}, [gameMode, setDataUser, wallet])

	// Когда уже в игре
	useEffect(() => {
		if (wallet && Number(userDataWallet.balance) < minBet) {
			if (gamePhase === 0 && !getStorage('dontPayUser')) {
				setStorage('dontPayUser', '1')
			}
		} else {
			removeStorage('dontPayUser')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gamePhase, wallet])

	// Когда заходит в App
	useEffect(() => {
		if (wallet && Number(userDataWallet.balance) < minBet) {
			setStorage('dontPayUser', '1')
		} else {
			removeStorage('dontPayUser')
		}
	}, [wallet])

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
					<p className='p-medium'>×{totalMultiplier}</p>
				</div>
				<div className={cx('footer__header__items')}>
					<h2>{balance}</h2>
					<p className='p-medium'>
						<Icon name='ton-medium' size='medium'/>
						{userDataWallet.balance}
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
						? getStorage('dontPayUser')
							? <ButtonTopUp sizeIcons='big' />
							: <PanelButtonsBet />
					: null
				)}
				<ButtonConnectWallet className={cx({ 'hide': wallet })} sizeIcons='big' />
			</footer>
		</footer>
	)
}
