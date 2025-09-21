import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost, reset } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';

const EditPostPage = () => {
  const { post, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPostById(postId));
    return () => dispatch(reset());
  }, [dispatch, isError, message, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add a slight delay for animation effect
    setTimeout(() => {
      dispatch(updatePost({ postId, postData: { title, content } }));
      toast.success('Post updated successfully! 🎉');
      navigate(`/post/${postId}`);
      setIsSubmitting(false);
    }, 800);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="edit-post-wrapper">
      <div className="edit-post-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className='form-container enhanced-form'>
        <div className="form-header">
          <h1 className="form-title">
            <span className="title-icon">✏️</span>
            Edit Post
            <div className="title-underline"></div>
          </h1>
          <p className="form-subtitle">Update your post content and make it shine!</p>
        </div>
        
        <form onSubmit={onSubmit} className="animated-form">
          <div className='form-group enhanced-group'>
            <label htmlFor='title' className="enhanced-label">
              <span className="label-text">📝 Title</span>
              <span className="label-accent"></span>
            </label>
            <div className="input-wrapper">
              <input 
                type='text' 
                name='title' 
                id='title' 
                value={title || ''} 
                onChange={(e) => setTitle(e.target.value)}
                className="enhanced-input"
                placeholder="Enter your post title..."
              />
              <div className="input-border"></div>
            </div>
          </div>
          
          <div className='form-group enhanced-group'>
            <label htmlFor='content' className="enhanced-label">
              <span className="label-text">📄 Content</span>
              <span className="label-accent"></span>
            </label>
            <div className="quill-wrapper">
              <ReactQuill 
                theme='snow' 
                value={content || ''} 
                onChange={setContent}
                className="enhanced-quill"
                placeholder="Write your amazing content here..."
              />
            </div>
          </div>
          
          <div className="button-wrapper">
            <button 
              className={`btn enhanced-btn ${isSubmitting ? 'submitting' : ''}`} 
              type='submit'
              disabled={isSubmitting}
            >
              <span className="btn-content">
                {isSubmitting ? (
                  <>
                    <div className="btn-spinner"></div>
                    Updating Post...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Update Post
                  </>
                )}
              </span>
              <div className="btn-shine"></div>
            </button>
          </div>
        </form>
        
        <div className="form-footer">
          <p className="footer-text">
            <span className="footer-icon">💡</span>
            Tip: Use the rich text editor to format your content beautifully!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;