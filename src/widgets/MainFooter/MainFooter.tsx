import WebApp from '@twa-dev/sdk'
import {
	useContext,
	// useContext,
	useEffect
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { getBalance, getDemoBalance } from '../../app/api'
import { setUserDataTelegram, setUserDataWallet } from '../../app/store/slices'
import { BetPanel, PanelButtonsBet } from '../../widgets'
import { useGetPhrases } from '../../hooks'
import { ButtonSwitchMode, ButtonConnectWallet, ButtonTopUp } from '../../feature'
import {
	Icon, Rounds, formatNumber, getCorrectBalanceWithFormatNumber,
	isDemoMode, minBet, setStorage, getStorage, removeStorage
} from '../../shared'
import { IRoundsType } from '../../shared/types'
import { ModalContextTypes } from '../../app/providers/ModalProvider/types'
import { ModalContext } from '../../app/contexts'

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
	const { gameMode } = useSelector((state: any) => state.modeSettings)
	const userDataWallet = useSelector((state: any) => state.userDataWallet)
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)

  const { livePlayers, last3rounds, allTimeWins } = useGetPhrases(['livePlayers', 'last3rounds', 'allTimeWins'])

	const setDataUser = () => {
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
					dispatch(setUserDataTelegram(WebApp.initDataUnsafe))
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
					dispatch(setUserDataTelegram(WebApp.initDataUnsafe))
				})
				.catch((error) => {
					new Error(error)

					return 0
				})

		}
	}

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
	}, [gameMode])

	// Когда уже в игре
	useEffect(() => {
		if (wallet && userDataWallet.balance < minBet) {
			if (gamePhase === 0 && !getStorage('dontPayUser')) {
				setStorage('dontPayUser', '1')
				openHandlerModal('switchMode')
			}
		} else {
			removeStorage('dontPayUser')
		}
	}, [gamePhase, userDataWallet.balance])

	// Когда заходит в App
	useEffect(() => {
		if (wallet && userDataWallet.balance < minBet) {
			setStorage('dontPayUser', '1')
		} else {
			removeStorage('dontPayUser')
		}
	}, [])

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
						<Icon name='ton-medium' size='medium' />
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
				{(
					wallet
					? userDataWallet.balance >= minBet
						? <PanelButtonsBet />
						: gameMode === isDemoMode
							? getStorage('dontPayUser') ? <ButtonSwitchMode sizeIcons='big' /> : <PanelButtonsBet />
							: <ButtonTopUp sizeIcons='big' />
					: null
				)}
				<ButtonConnectWallet className={cx({ 'hide': wallet })} sizeIcons='big' />
			</footer>
		</footer>
	)
}
