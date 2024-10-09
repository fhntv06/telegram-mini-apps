import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './types.ts';

const initialState: IUser = {
    wallet: {},
    chain: '',
    publicKey: '',
    address: '',
    appName: '',
    appVersion: '',
    maxProtocolVersion: '',
    platform: '',
    balance: 0
}

const index = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.wallet = action.payload.wallet;
            state.chain = action.payload.chain;
            state.publicKey = action.payload.publicKey;
            state.address = action.payload.address;
            state.appName = action.payload.appName;
            state.appVersion = action.payload.appVersion;
            state.maxProtocolVersion = action.payload.maxProtocolVersion;
            state.platform = action.payload.platform;
            state.balance = action.payload.balance;
        },
    }
});

export const { setUser } = index.actions;
export const userReducer = index.reducer