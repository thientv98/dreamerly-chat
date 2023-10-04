import { configureStore } from '@reduxjs/toolkit';
import conversationSlice from './conversationSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationSlice
  },
});