import { createSlice } from '@reduxjs/toolkit'
import { IBets } from './types'

const initialState: IBets = {
    bet: 0,
    address: ''
}

const index = createSlice({
    name: 'bets',
    initialState,
    reducers: {
        setBet(state, action) {
            state.bet = action.payload.bet;
        },
        setAddressTransaction(state, action) {
            state.address = action.payload.address;
        }
    }
})

export const { setBet, setAddressTransaction } = index.actions;
export const betsReducer = index.reducer;
