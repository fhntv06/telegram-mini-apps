export {
	userDataWalletReducer, userDataTelegramReducer, userRetrievesDataReducer,
	removeUserDataWallet, setUserDataTelegram, setUserDataWallet, setUserRetrievesData
} from './user'
export { betsReducer, setDataTransaction, setBet, removeBet } from './bets'
export {
	gameStatusReducer, setGameStatus,
	leaderboardsReducer, setLeaderboards,
	tasksReducer, setTasks
} from './game'
export { langReducer, setLang } from './language'
export { modeReducer, setModeSettings } from './mode'
export { socketReducer, setSocket, closeSocket } from './socket'
