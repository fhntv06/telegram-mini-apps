import { createSlice } from '@reduxjs/toolkit'
import { ILeaderboards } from './types'

const initialState: ILeaderboards = {
  leaderBord: [
    {
      place: 1,
      name: "Dan",
      points: 98062050631
    }
  ]
}

const sliceLeaderboard = createSlice({
  name: 'userLeaderboard',
  initialState,
  reducers: {
    setLeaderboards: (state, action) => {
      state.leaderBord = action.payload.leaderBord
    }
  }
})

export const { setLeaderboards } = sliceLeaderboard.actions
export const leaderboardsReducer = sliceLeaderboard.reducer
