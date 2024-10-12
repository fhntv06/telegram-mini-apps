import { createSlice } from '@reduxjs/toolkit'
import { IModeSettings } from './types';

export const initialState: IModeSettings = {
    coin: 'btc',
    time: {
        text: '$BTC, 30s',
        value: 30,
        unit: 's'
    }
}

const index = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setModeSettings(state, action) {
            state.coin = action.payload.coin
            state.time = action.payload.time
        }
    }
});

export const { setModeSettings } = index.actions;
export const modeReducer = index.reducer;
