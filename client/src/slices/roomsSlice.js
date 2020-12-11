/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
  const data = await fetch('/api/v1/rooms');
  const { rooms } = await data.json();
  return rooms;
});

const initialState = {
  status: 'idle',
  error: null,
  rooms: [],
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [getRooms.pending]: (state) => {
      state.status = 'loading';
    },
    [getRooms.fulfilled]: (state, action) => {
      state.rooms = action.payload;
    },
    [getRooms.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default roomsSlice.reducer;
