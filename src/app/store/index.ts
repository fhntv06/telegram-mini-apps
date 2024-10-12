import { configureStore } from '@reduxjs/toolkit';
import { userReducer, betsReducer, gameStatusReducer, langReducer, modeReducer} from './slices'

const store = configureStore({
    reducer: {
        user: userReducer,
        bets: betsReducer,
        gameStatus: gameStatusReducer,
        language: langReducer,
        modeSettings: modeReducer
    }
});

export default store;
