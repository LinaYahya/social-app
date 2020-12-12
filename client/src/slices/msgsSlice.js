import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  msgs: [],
  error: null,
};

const msgsSlice = createSlice({
  initialState,
  name: 'msgs',
  reducers: {},
  extraReducers: {

  },
});

export default msgsSlice.reducer;
