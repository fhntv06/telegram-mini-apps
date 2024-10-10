import { configureStore } from '@reduxjs/toolkit';
import { userReducer, betsReducer, gameStatusReducer, langReducer } from './slices'

const store = configureStore({
    reducer: {
        user: userReducer,
        bets: betsReducer,
        gameStatus: gameStatusReducer,
        language: langReducer
    }
});

export default store;
