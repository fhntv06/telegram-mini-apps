import { configureStore } from '@reduxjs/toolkit'
import {
  userDataWalletReducer, userDataTelegramReducer, betsReducer,
  gameStatusReducer, langReducer, modeReducer,
  socketReducer, userRetrievesDataReducer, leaderboardsReducer, tasksReducer
} from './slices'

const store = configureStore({
    reducer: {
        userDataWallet: userDataWalletReducer,
        userDataTelegram: userDataTelegramReducer,
        bets: betsReducer,
        gameStatus: gameStatusReducer,
        language: langReducer,
        modeSettings: modeReducer,
        socket: socketReducer,
        retrievesData: userRetrievesDataReducer,
        leaderboards: leaderboardsReducer,
        tasks: tasksReducer,
    }
})

export default store
