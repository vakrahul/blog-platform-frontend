import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users/';

// Get a user's public profile
const getUser = async (userId) => {
  const response = await axios.get(API_URL + userId);
  return response.data;
};

const userService = {
  getUser,
};

export default userService;