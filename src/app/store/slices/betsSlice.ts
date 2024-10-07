import { createSlice } from '@reduxjs/toolkit';

const initialState: { bet: number } = {
    bet: 0
}

const betsSlice = createSlice({
    name: 'bets',
    initialState,
    reducers: {
        setBet(state, action) {
            state.bet = action.payload.bet;
        }
    }
});

export const { setBet } = betsSlice.actions;
export const betsReducer = betsSlice.reducer;
