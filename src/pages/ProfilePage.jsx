import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Add this import
import { getPosts, reset } from '../features/posts/postSlice';
import Spinner from '../components/Spinner';
import PostItem from '../components/PostItem';
import Meta from '../components/Meta';
import { motion } from 'framer-motion';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this hook
  
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  
  // Get user from auth state if available
  const { user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getPosts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  // Add navigation handlers
  const handleCreatePost = () => {
    navigate('/create-post'); // Adjust path as per your routes
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Adjust path as per your routes
  };

  const handleCreateFirstPost = () => {
    navigate('/create-post'); // Adjust path as per your routes
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <motion.div 
      className="homepage-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Meta />
      
      {/* Hero Section with User Profile */}
      <motion.section 
        className="hero-section"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="hero-background">
          <div className="floating-elements">
            <div className="float-element element-1"></div>
            <div className="float-element element-2"></div>
            <div className="float-element element-3"></div>
          </div>
        </div>
        
        <div className="hero-content">
          {/* User Profile Card */}
          {user && (
            <motion.div 
              className="user-profile-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="profile-glow"></div>
              <div className="profile-header">
                <div className="avatar-container">
                  <div className="avatar-glow"></div>
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=ff6b35&color=ffffff&size=100`} 
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div className="avatar-ring"></div>
                </div>
                <div className="profile-info">
                  <h2 className="user-name">{user.name}</h2>
                  <p className="user-email">{user.email}</p>
                  <div className="user-stats">
                    <div className="stat-item">
                      <span className="stat-number">{posts?.length || 0}</span>
                      <span className="stat-label">Posts</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <span className="stat-number">{Math.floor((posts?.length || 0) * 12)}</span>
                      <span className="stat-label">Readers</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <span className="stat-number">{posts?.length > 0 ? '4.2' : '0.0'}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-actions">
                <button 
                  className="profile-btn primary-btn"
                  onClick={handleCreatePost}
                >
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  Create Post
                </button>
                <button 
                  className="profile-btn secondary-btn"
                  onClick={handleEditProfile}
                >
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Edit Profile
                </button>
              </div>
            </motion.div>
          )}

          {/* Welcome Section */}
          <motion.div 
            className="welcome-section"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="welcome-content">
              <h1 className="page-title">
                <span className="title-icon">✨</span>
                Latest Stories & Insights
                <span className="title-icon">🚀</span>
              </h1>
              <p className="page-subtitle">
                Discover amazing content from our community of writers and creators
              </p>
              
              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-content">
                    <span className="stat-value">{posts?.length || 0}</span>
                    <span className="stat-name">Articles</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <span className="stat-value">{Math.floor((posts?.length || 0) * 15)}</span>
                    <span className="stat-name">Readers</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <span className="stat-value">{posts?.length > 5 ? '4.2' : posts?.length > 0 ? '3.8' : '0.0'}</span>
                    <span className="stat-name">Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Posts Section */}
      <motion.section 
        className="posts-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="section-header">
          <h2 className="section-title">Featured Articles</h2>
          <div className="section-line"></div>
        </div>

        {posts?.length > 0 ? (
          <motion.div 
            className="posts-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                className="post-item-wrapper"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <PostItem post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="empty-state"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No Stories Yet</h3>
            <p className="empty-description">
              Be the first to share your amazing story with the community!
            </p>
            <button 
              className="empty-action-btn"
              onClick={handleCreateFirstPost}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create Your First Post
            </button>
          </motion.div>
        )}
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="newsletter-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="newsletter-card">
          <div className="newsletter-glow"></div>
          <div className="newsletter-content">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest stories and insights delivered to your inbox
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Enter your email..."
              />
              <button className="newsletter-btn">
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;