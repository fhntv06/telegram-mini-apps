import { createSlice } from '@reduxjs/toolkit';

const initialState: { socket: WebSocket | undefined } = {
  socket: undefined,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload.socket;
    },
    closeSocket(state) {
      if (state.socket) state.socket.close()
      state.socket = undefined
    }
  }
});

export const { setSocket, closeSocket } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
