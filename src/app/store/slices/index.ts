export {
	userDataWalletReducer, userDataTelegramReducer, userRetrievesDataReducer,
	removeUserDataWallet, setUserDataTelegram, setUserDataWallet, setUserRetrievesData
} from './user'
export { betsReducer, setDataTransaction, setBet, removeBet } from './bets'
export {
	gameStatusReducer, setGameStatus, setHintTasks,
	leaderboardsReducer, setLeaderboards, setDefaultTasks,
	tasksReducer, setPartnersTasks, setClaimTasks,
	setSettings
} from './game'
export { langReducer, setLang } from './language'
export { modeReducer, setModeSettings } from './mode'
export { socketReducer, setSocket, closeSocket } from './socket'
