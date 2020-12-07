/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFriendsRequest = createAsyncThunk('friends/getRequests', async () => {
  const data = await fetch('/api/v1/friends/pending');
  const { list } = await data.json();
  return list;
});

export const getSuggestedFriends = createAsyncThunk('friends/getSuggested', async (row) => {
  const data = await fetch(`/api/v1/users/${row}`);
  const { users } = await data.json();
  return users;
});

const initialState = {
  status: 'idle',
  error: null,
  friendsRequest: [],
  suggestedFriends: [],
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
      state.friendsRequest = action.payload;
    },
    [getFriendsRequest.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [getSuggestedFriends.pending]: (state) => {
      state.status = 'loading';
    },
    [getSuggestedFriends.fulfilled]: (state, action) => {
      state.suggestedFriends = action.payload;
    },
    [getSuggestedFriends.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default friendsSlice.reducer;
