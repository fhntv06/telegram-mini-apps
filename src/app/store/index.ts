import { configureStore } from '@reduxjs/toolkit'
import {
  userDataWalletReducer, userDataTelegramReducer, betsReducer,
  gameStatusReducer, langReducer, modeReducer,
  socketReducer, userRetrievesDataReducer, leaderboardsReducer, tasksReducer
} from './slices'
import { settingsReducer } from "./slices/game/sliceSettings.ts";

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
        settings: settingsReducer
    }
})

export default store
