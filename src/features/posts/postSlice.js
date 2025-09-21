import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  posts: [],
  post: {},
  page: 1,
  pages: 1,
  postCreated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- Async Thunks ---

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (pageNumber = '', thunkAPI) => {
    try {
      return await postService.getPosts(pageNumber);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPostById = createAsyncThunk(
  'posts/getById',
  async (postId, thunkAPI) => {
    try {
      return await postService.getPostById(postId);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPostsByUser = createAsyncThunk(
  'posts/getByUser',
  async (userId, thunkAPI) => {
    try {
      return await postService.getPostsByUser(userId);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ postId, postData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePost(postId, postData, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await postService.deletePost(postId, token);
      return postId;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchPosts = createAsyncThunk(
  'posts/search',
  async (keyword, thunkAPI) => {
    try {
      return await postService.searchPosts(keyword);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createComment = createAsyncThunk(
  'posts/createComment',
  async ({ postId, commentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createComment(postId, commentData, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- Slice Definition ---

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => {
      state.post = {};
      state.postCreated = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.postCreated = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postCreated = true;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.posts;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPostsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPostsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // In a real app, the backend should return the updated comment list.
        // For now, we'll just mark it as success and let the component re-fetch.
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;