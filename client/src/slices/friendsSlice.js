/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFriendsRequest = createAsyncThunk('friends/getRequests', async () => {
  const data = await fetch('/api/v1/friends/pending');
  const { list } = await data.json();
  return list;
});

const initialState = {
  status: 'idle',
  error: null,
  friendsRequest: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: {
    [getFriendsRequest.pending]: (state) => {
      state.status = 'loading';
    },
    [getFriendsRequest.fulfilled]: (state, action) => {
      state.friendsRequest = state.friendsRequest.concat(action.payload);
    },
    [getFriendsRequest.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default friendsSlice.reducer;
