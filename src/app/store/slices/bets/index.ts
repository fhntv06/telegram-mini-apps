import { createSlice } from '@reduxjs/toolkit'
import { IBets } from './types'

const initialState: IBets = {
    bet: .5,
    address: '',
    mainnet: true,
}

const index = createSlice({
    name: 'bets',
    initialState,
    reducers: {
        setBet(state, action) {
            state.bet = action.payload.bet
        },
        setDataTransaction(state, action) {
            state.address = action.payload.address
            state.mainnet = action.payload.mainnet
        },
        removeBet(state) {
            state.bet = initialState.bet
        }
    }
})

export const { setBet, setDataTransaction, removeBet } = index.actions
export const betsReducer = index.reducer
