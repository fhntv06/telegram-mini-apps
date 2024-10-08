import { configureStore } from '@reduxjs/toolkit';
import { userReducer, betsReducer, gameStatusReducer } from './slices'

const store = configureStore({
    reducer: {
        user: userReducer,
        bets: betsReducer,
        gameStatus: gameStatusReducer
    }
});

export default store;
