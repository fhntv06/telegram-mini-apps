import { createSlice } from '@reduxjs/toolkit'
import { IUserRetrievesData } from './types.ts'

const initialState: IUserRetrievesData = {
  multiplier: 1.5,
  invitedFriends: 5,
  daysInRow: 7,
  totalBets: 10.5
}

const sliceUserRetrievesData = createSlice({
  name: 'userRetrievesData',
  initialState,
  reducers: {
    setUserRetrievesData: (state, action) => {
      state.multiplier = action.payload.multiplier
      state.invitedFriends = action.payload.invitedFriends
      state.daysInRow = action.payload.daysInRow
      state.totalBets = action.payload.totalBets
    }
  }
})

export const { setUserRetrievesData } = sliceUserRetrievesData.actions

export const userRetrievesDataReducer = sliceUserRetrievesData.reducer
