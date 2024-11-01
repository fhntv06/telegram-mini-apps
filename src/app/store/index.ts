import { configureStore } from '@reduxjs/toolkit';
import { userDataWalletReducer, userDataTelegramReducer, betsReducer, gameStatusReducer, langReducer, modeReducer} from './slices'

const store = configureStore({
    reducer: {
        userDataWallet: userDataWalletReducer,
        userDataTelegram: userDataTelegramReducer,
        bets: betsReducer,
        gameStatus: gameStatusReducer,
        language: langReducer,
        modeSettings: modeReducer
    }
});

export default store;
