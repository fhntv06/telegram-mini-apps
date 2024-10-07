import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/user';

const initialState: IUser = {
    chain: '',
    publicKey: '',
    address: '',
    appName: '',
    appVersion: '',
    maxProtocolVersion: '',
    platform: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.chain = action.payload.chain;
            state.publicKey = action.payload.publicKey;
            state.address = action.payload.address;
            state.appName = action.payload.appName;
            state.appVersion = action.payload.appVersion;
            state.maxProtocolVersion = action.payload.maxProtocolVersion;
            state.platform = action.payload.platform;
        },
        removeUser(state) {
            state.chain = initialState.chain
            state.publicKey = initialState.publicKey
            state.address = initialState.address
            state.appName = initialState.appName
            state.appVersion = initialState.appVersion
            state.maxProtocolVersion = initialState.maxProtocolVersion
            state.platform = initialState.platform
        }
    }
});

export const userReducer = userSlice.reducer
export const { setUser, removeUser } = userSlice.actions;
