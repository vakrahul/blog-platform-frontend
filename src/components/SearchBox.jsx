import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPosts, getPosts } from '../features/posts/postSlice'; // 1. Import getPosts
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      dispatch(searchPosts(keyword));
    } else {
      // If the user submits an empty form, get all posts
      dispatch(getPosts());
    }
  };

  const resetHandler = () => {
    setKeyword('');
    dispatch(getPosts()); // Fetch all posts on reset
  };

  return (
    <form onSubmit={submitHandler} className='search-box'>
      <input
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search posts...'
      />
      <button type='submit' className='btn'>
        <FaSearch /> Search
      </button>
      <button type='button' className='btn btn-light' onClick={resetHandler}>
        <FaTimes /> Reset
      </button>
    </form>
  );
};

export default SearchBox;