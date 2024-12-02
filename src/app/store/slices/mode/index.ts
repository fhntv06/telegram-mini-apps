import { createSlice } from '@reduxjs/toolkit'
import { IModeSettings } from './types'
import { isDemoMode } from '../../../../shared/constants'

export const initialState: IModeSettings = {
    coin: 'btc',
    time: {
        text: '$BTC, 30s',
        value: 30,
        unit: 's'
    },
    ticker: 'BTC-30',
    gameMode: isDemoMode
}

const index = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setModeSettings(state, action) {
            state.coin = action.payload.coin
            state.time = action.payload.time
            state.ticker = action.payload.ticker
            state.gameMode = action.payload.gameMode
        }
    }
});

export const { setModeSettings } = index.actions;
export const modeReducer = index.reducer;
