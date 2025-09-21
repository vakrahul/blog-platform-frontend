import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts, reset } from '../features/posts/postSlice';
import Spinner from '../components/Spinner';
import PostItem from '../components/PostItem';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import SearchBox from '../components/SearchBox';
import { motion } from 'framer-motion';
import { FaRss } from 'react-icons/fa'; 

const HomePage = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useParams() || { pageNumber: 1 };

  // Get all necessary state from the posts slice, including pagination
  const { posts, page, pages, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // Fetch posts for the specific page number
    dispatch(getPosts(pageNumber));

    // Cleanup function
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, pageNumber]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Meta />
      <h1>Latest Posts</h1>
        <h1 className='page-title'></h1>
      <SearchBox />

      {posts?.length > 0 ? (
        <>
          <div className='posts-container'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
          <Paginate pages={pages} page={page} />
        </>
      ) : (
        <h3>No posts have been created yet.</h3>
      )}
    </motion.div>
  );
};

export default HomePage;