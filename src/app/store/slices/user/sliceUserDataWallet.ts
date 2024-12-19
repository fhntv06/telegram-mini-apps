import { createSlice } from '@reduxjs/toolkit'
import { IUser } from './types.ts'

const initialState: IUser = {
  isConnected: false,
  wallet: null,
  chain: '',
  publicKey: '',
  address: '',
  appName: '',
  appVersion: '',
  maxProtocolVersion: '',
  platform: '',
  balance: 0,
}

const sliceUserDataWallet = createSlice({
  name: 'userDataWallet',
  initialState,
  reducers: {
    setUserDataWallet: (state, action) => {
      state.isConnected = action.payload.isConnected
      state.wallet = action.payload.wallet
      state.chain = action.payload.chain
      state.publicKey = action.payload.publicKey
      state.address = action.payload.address
      state.appName = action.payload.appName
      state.appVersion = action.payload.appVersion
      state.maxProtocolVersion = action.payload.maxProtocolVersion
      state.platform = action.payload.platform
      state.balance = action.payload.balance
    },
    removeUserDataWallet: (state) => {
      state.isConnected = initialState.isConnected
      state.wallet = initialState.wallet
      state.chain = initialState.chain
      state.publicKey = initialState.publicKey
      state.address = initialState.address
      state.appName = initialState.appName
      state.appVersion = initialState.appVersion
      state.maxProtocolVersion = initialState.maxProtocolVersion
      state.platform = initialState.platform
      state.balance = initialState.balance
    }
  }
})

export const { setUserDataWallet, removeUserDataWallet } = sliceUserDataWallet.actions

export const userDataWalletReducer = sliceUserDataWallet.reducer
