import { createSlice } from '@reduxjs/toolkit'
import { IUserDataTelegram } from './types.ts'

const initialState: IUserDataTelegram = {
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

const sliceUserDataTelegram = createSlice({
  name: 'userDataTelegram',
  initialState,
  reducers: {
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
    }
  }
})

export const { setUserDataTelegram } = sliceUserDataTelegram.actions

export const userDataTelegramReducer = sliceUserDataTelegram.reducer
