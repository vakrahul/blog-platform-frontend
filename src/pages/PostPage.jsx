import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, deletePost, createComment, reset } from '../features/posts/postSlice';
import Spinner from '../components/Spinner';
import Meta from '../components/Meta';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PostPage = () => {
  const [text, setText] = useState(''); // State for the comment form

  const { post, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPostById(postId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, postId]);

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
      toast.success('Post deleted successfully');
      navigate('/');
    }
  };
  
  const commentSubmitHandler = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return toast.error('Comment cannot be empty');
    }
    dispatch(createComment({ postId, commentData: { text } }));
    setText('');
    toast.success('Comment submitted!');
    // We can optionally re-fetch the post to see the new comment immediately
    dispatch(getPostById(postId));
  };

  if (isLoading || !post.author) {
    return <Spinner />;
  }

  return (
    <motion.div
      className='post-page'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Meta title={post.title} description={post.content.substring(0, 150)} />

      {post.imageUrl && (
        <img
          src={`http://localhost:5001${post.imageUrl}`}
          alt={post.title}
          className='post-hero-image'
        />
      )}

      <h1>{post.title}</h1>
      <p className='author-info'>
        <FaUserCircle />
        <Link to={`/profile/${post.author._id}`}>{post.author.name}</Link>
      </p>

      {user && user._id === post.author._id && (
        <div className='post-actions'>
          <Link to={`/edit-post/${post._id}`} className='btn'>
            <FaEdit /> Edit
          </Link>
          <button onClick={onDelete} className='btn btn-danger'>
            <FaTrash /> Delete
          </button>
        </div>
      )}

      <div
        className='post-content'
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      {/* --- ADDED COMMENT SECTION --- */}
      <section className='comment-section'>
        <h2>Comments</h2>
        {post.comments?.length === 0 && <p>No comments yet. Be the first to comment!</p>}
        {post.comments?.map((comment) => (
          <div key={comment._id} className='comment'>
            <strong>{comment.name}</strong>
            <p>{comment.text}</p>
            <small>{new Date(comment.createdAt).toLocaleString('en-US')}</small>
          </div>
        ))}
        {user ? (
          <form onSubmit={commentSubmitHandler}>
            <div className='form-group'>
              <label htmlFor='comment'>Leave a Comment</label>
              <textarea
                id='comment'
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows='3'
              ></textarea>
            </div>
            <button className='btn' type='submit'>
              Submit
            </button>
          </form>
        ) : (
          <p><Link to='/login'>Log in</Link> to leave a comment.</p>
        )}
      </section>
    </motion.div>
  );
};

export default PostPage;