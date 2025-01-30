import { createSlice } from '@reduxjs/toolkit'
import { ISettings } from './types'

const initialState: ISettings = {
  settings: {
    isFullscreen: false
  }
}

const sliceSettings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload.settings
    },
  }
})

export const { setSettings } = sliceSettings.actions
export const settingsReducer = sliceSettings.reducer
