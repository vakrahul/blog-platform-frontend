import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const EditProfile = () => {
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        location: user.location || '',
        website: user.website || '',
        twitter: user.twitter || '',
        linkedin: user.linkedin || '',
        github: user.github || ''
      });
      setPreviewAvatar(user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=667eea&color=ffffff&size=200`);
    }
    
    return () => dispatch(reset());
  }, [user, isError, message, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Update avatar preview
    if (name === 'avatar') {
      setPreviewAvatar(value || `https://ui-avatars.com/api/?name=${formData.name}&background=667eea&color=ffffff&size=200`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      dispatch(updateUser(formData));
      toast.success('Profile updated successfully! 🎉');
      setIsSubmitting(false);
      // navigate('/dashboard'); // Navigate to dashboard or profile page
    }, 800);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className='form-container enhanced-form profile-form'>
        <div className="form-header">
          <h1 className="form-title">
            <span className="title-icon">👤</span>
            Edit Profile
            <div className="title-underline"></div>
          </h1>
          <p className="form-subtitle">Update your profile information and make it shine!</p>
        </div>
        
        <form onSubmit={onSubmit} className="animated-form">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-preview-container">
              <div className="avatar-glow"></div>
              <img 
                src={previewAvatar} 
                alt="Profile Preview" 
                className="avatar-preview"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${formData.name}&background=667eea&color=ffffff&size=200`;
                }}
              />
              <div className="avatar-ring"></div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">📝</span>
              Personal Information
            </h3>
            
            <div className="form-row">
              <div className='form-group enhanced-group'>
                <label htmlFor='name' className="enhanced-label">
                  <span className="label-text">👨‍💼 Full Name</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='text' 
                    name='name' 
                    id='name' 
                    value={formData.name} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="Enter your full name..."
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
              
              <div className='form-group enhanced-group'>
                <label htmlFor='email' className="enhanced-label">
                  <span className="label-text">📧 Email Address</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='email' 
                    name='email' 
                    id='email' 
                    value={formData.email} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="Enter your email address..."
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className='form-group enhanced-group'>
                <label htmlFor='location' className="enhanced-label">
                  <span className="label-text">📍 Location</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='text' 
                    name='location' 
                    id='location' 
                    value={formData.location} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="Your location..."
                  />
                  <div className="input-border"></div>
                </div>
              </div>
              
              <div className='form-group enhanced-group'>
                <label htmlFor='avatar' className="enhanced-label">
                  <span className="label-text">🖼️ Avatar URL</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='url' 
                    name='avatar' 
                    id='avatar' 
                    value={formData.avatar} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="Profile picture URL..."
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            </div>
            
            <div className='form-group enhanced-group full-width'>
              <label htmlFor='bio' className="enhanced-label">
                <span className="label-text">📖 Bio</span>
                <span className="label-accent"></span>
              </label>
              <div className="textarea-wrapper">
                <textarea 
                  name='bio' 
                  id='bio' 
                  value={formData.bio} 
                  onChange={handleChange}
                  className="enhanced-textarea"
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
                <div className="input-border"></div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">🌐</span>
              Social Links
            </h3>
            
            <div className="form-row">
              <div className='form-group enhanced-group'>
                <label htmlFor='website' className="enhanced-label">
                  <span className="label-text">🌍 Website</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='url' 
                    name='website' 
                    id='website' 
                    value={formData.website} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="https://yourwebsite.com"
                  />
                  <div className="input-border"></div>
                </div>
              </div>
              
              <div className='form-group enhanced-group'>
                <label htmlFor='twitter' className="enhanced-label">
                  <span className="label-text">🐦 Twitter</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='text' 
                    name='twitter' 
                    id='twitter' 
                    value={formData.twitter} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="@yourusername"
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className='form-group enhanced-group'>
                <label htmlFor='linkedin' className="enhanced-label">
                  <span className="label-text">💼 LinkedIn</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='url' 
                    name='linkedin' 
                    id='linkedin' 
                    value={formData.linkedin} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="linkedin.com/in/yourusername"
                  />
                  <div className="input-border"></div>
                </div>
              </div>
              
              <div className='form-group enhanced-group'>
                <label htmlFor='github' className="enhanced-label">
                  <span className="label-text">💻 GitHub</span>
                  <span className="label-accent"></span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type='text' 
                    name='github' 
                    id='github' 
                    value={formData.github} 
                    onChange={handleChange}
                    className="enhanced-input"
                    placeholder="github.com/yourusername"
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="button-wrapper">
            <button 
              type="button"
              className="btn secondary-btn"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <span className="btn-content">
                <span className="btn-icon">❌</span>
                Cancel
              </span>
            </button>
            
            <button 
              className={`btn enhanced-btn ${isSubmitting ? 'submitting' : ''}`} 
              type='submit'
              disabled={isSubmitting}
            >
              <span className="btn-content">
                {isSubmitting ? (
                  <>
                    <div className="btn-spinner"></div>
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">💾</span>
                    Save Changes
                  </>
                )}
              </span>
              <div className="btn-shine"></div>
            </button>
          </div>
        </form>
        
        <div className="form-footer">
          <p className="footer-text">
            <span className="footer-icon">🔐</span>
            Your information is secure and will only be used to improve your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;