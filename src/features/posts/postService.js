import axios from 'axios';

const API_URL = 'http://localhost:5001/api/posts/';

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};
const updatePost = async (postId, postData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(API_URL + postId, postData, config);
  return response.data;
};
// Get all posts
const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const deletePost = async (postId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(API_URL + postId, config);
  return response.data;
};

// Get a single post by ID
const getPostById = async (postId) => {
  const response = await axios.get(API_URL + postId);
  return response.data;
};

// Get all posts for a specific user
const getPostsByUser = async (userId) => {
  const response = await axios.get(API_URL + 'user/' + userId);
  return response.data;
};
const searchPosts = async (keyword) => {
  const response = await axios.get(API_URL + 'search/' + keyword);
  return response.data;
};
const createComment = async (postId, commentData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}${postId}/comments`, commentData, config);
  return response.data;
};

const postService = {
  createPost,
  getPosts,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
  searchPosts,
  createComment,
};

export default postService;