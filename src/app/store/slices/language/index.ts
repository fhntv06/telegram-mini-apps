import { createSlice } from '@reduxjs/toolkit';
import { ILang } from '../../../../shared/types'

const initialState: ILang = {
  name: 'english',
  icon: 'flag-uk',
  action: 'set-lang',
  active: true
}

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang(state, action) {
      state.name = action.payload.name
      state.icon = action.payload.icon
      state.action = action.payload.action
      state.active = action.payload.active
    }
  }
});

export const { setLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
