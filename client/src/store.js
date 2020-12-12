import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './slices/friendsSlice';
import roomsReducer from './slices/roomsSlice';
import msgsReducer from './slices/msgsSlice';

export default configureStore({
  reducer: {
    friends: friendsReducer,
    rooms: roomsReducer,
    msgs: msgsReducer,
  },
});
