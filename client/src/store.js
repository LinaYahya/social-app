import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './slices/friendsSlice';
import roomsReducer from './slices/roomsSlice';

export default configureStore({
  reducer: {
    friends: friendsReducer,
    rooms: roomsReducer,
  },
});
