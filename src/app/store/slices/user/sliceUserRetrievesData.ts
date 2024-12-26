import { createSlice } from '@reduxjs/toolkit'
import { IUserRetrievesData } from './types.ts'

const initialState: IUserRetrievesData = {
  invitedFriends: 5,
  daysInRow: 7,
  totalBets: 10.5,
  placeInLeaderboard: 8,
  points: 12932938128,
  multiplierData: {
    daily: 1.2,
    bets: 1.1,
    refs: 2.5,
    totalMultiplier: 4.7,
  }
}

const sliceUserRetrievesData = createSlice({
  name: 'userRetrievesData',
  initialState,
  reducers: {
    setUserRetrievesData: (state, action) => {
      state.invitedFriends = action.payload.invitedFriends
      state.daysInRow = action.payload.daysInRow
      state.totalBets = action.payload.totalBets
      state.placeInLeaderboard = action.payload.placeInLeaderboard
      state.points = action.payload.points
      state.multiplierData = action.payload.multiplierData
    }
  }
})

export const { setUserRetrievesData } = sliceUserRetrievesData.actions

export const userRetrievesDataReducer = sliceUserRetrievesData.reducer
