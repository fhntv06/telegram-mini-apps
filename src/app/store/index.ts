import { configureStore } from '@reduxjs/toolkit';
import { userReducer, betsReducer } from './slices'

const store = configureStore({
    reducer: {
        user: userReducer,
        bets: betsReducer
    }
});

export default store;
