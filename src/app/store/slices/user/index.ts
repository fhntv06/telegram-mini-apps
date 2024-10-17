import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './types.ts';

const initialState: IUser = {
    wallet: null,
    chain: '',
    publicKey: '',
    address: '',
    appName: '',
    appVersion: '',
    maxProtocolVersion: '',
    platform: '',
    balance: 0,
    id: 0,
    username: '',
    photo_url: '',
    last_name: '',
    first_name: '',
    is_bot: '',
    is_premium: '',
    language_code: '',
    allows_write_to_pm: '',
    added_to_attachment_menu: '',
}

const index = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
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
        setUserDataTelegram: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.photo_url = action.payload.photo_url
            state.last_name = action.payload.last_name
            state.first_name = action.payload.first_name
            state.is_bot = action.payload.is_bot
            state.is_premium = action.payload.is_premium
            state.language_code = action.payload.language_code
            state.allows_write_to_pm = action.payload.allows_write_to_pm
            state.added_to_attachment_menu = action.payload.added_to_attachment_menu
        },
        removeUser: () => initialState
    }
});

export const { setUser, setUserDataTelegram, removeUser } = index.actions;
export const userReducer = index.reducer