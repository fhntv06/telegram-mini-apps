import { createSlice } from '@reduxjs/toolkit';
import { ILang } from './types'

const initialState: ILang = {
  lang: 'english'
}

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang(state, action) {
      state.lang = action.payload.lang
    }
  }
});

export const { setLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
