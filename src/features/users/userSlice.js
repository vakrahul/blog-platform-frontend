import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getUser = createAsyncThunk('users/get', async (userId, thunkAPI) => {
  try {
    return await userService.getUser(userId);
  } catch (error) {
    const message =
      (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;