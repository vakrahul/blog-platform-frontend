import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/posts/postSlice';
import userReducer from '../features/users/userSlice'; // 1. Import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: userReducer, // 2. Add
  },
});