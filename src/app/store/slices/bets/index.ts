import { createSlice } from '@reduxjs/toolkit';

const initialState: { bet: number } = {
    bet: 0
}

const index = createSlice({
    name: 'bets',
    initialState,
    reducers: {
        setBet(state, action) {
            state.bet = action.payload.bet;
        }
    }
})

export const { setBet } = index.actions;
export const betsReducer = index.reducer;
