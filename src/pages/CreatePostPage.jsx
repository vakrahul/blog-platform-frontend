import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, reset } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../components/Spinner';
// No separate CSS import needed - styles are in main.scss

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, postCreated, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    setIsVisible(true);
    if (isError) {
      toast.error(message);
    }
    if (postCreated) {
      toast.success('Post created!');
      navigate('/');
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, postCreated, message, navigate, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const uploadImageHandler = async () => {
    if (!imageFile) return '';
    const formData = new FormData();
    formData.append('image', imageFile);
    setUploading(true);

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post('http://localhost:5001/api/upload', formData, config);
      setUploading(false);
      return data.image; // Corrected: Return only the image path string
    } catch (error) {
      setUploading(false);
      toast.error('Image upload failed!');
      return '';
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please add both a title and content');
      return;
    }

    let imagePath = '';
    if (imageFile) {
      imagePath = await uploadImageHandler();
      if (!imagePath) {
        return; // Stop if upload failed
      }
    }

    // Corrected: Use 'imageUrl' to match your backend model and controller
    dispatch(createPost({ title, content, imageUrl: imagePath }));
  };

  if (isLoading || uploading) {
    return <Spinner />;
  }

  return (
    <div className={`create-post-container ${isVisible ? 'fade-in' : ''}`}>
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
        <div className="floating-element element-5"></div>
      </div>

      <div className="main-content">
        {/* Header Section */}
        <section className="header-section">
          <div className="header-background"></div>
          <div className="header-content glass-effect">
            <div className="header-icons">
              <div className="icon-wrapper sparkle">
                <svg className="header-icon bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </div>
              <h1 className="main-title gradient-text pulse-animation">
                Create New Post
              </h1>
              <div className="icon-wrapper sparkle">
                <svg className="header-icon bounce delay-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,0.5l2.8,8.4l8.7,0l-7,5.1l2.7,8.4L13,17.3l-7,5.1l2.7-8.4l-7-5.1l8.7,0L13,0.5z"/>
                </svg>
              </div>
            </div>
            <p className="header-subtitle fade-in-up">
              Share your amazing story with the world ✨
            </p>
            <div className="header-badges">
              <span className="badge badge-1 pulse-animation">✍️ Write</span>
              <span className="badge badge-2 pulse-animation delay-500">📸 Share</span>
              <span className="badge badge-3 pulse-animation delay-1000">🚀 Publish</span>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="form-section fade-in-up delay-400">
          <div className="form-background"></div>
          <div className="form-container glass-effect hover-lift">
            {/* Animated Top Border */}
            <div className="animated-border"></div>
            
            <form onSubmit={onSubmit} className="post-form">
              {/* Title Input */}
              <div className={`form-group hover-lift ${focusedField === 'title' ? 'focused' : ''}`}>
                <label htmlFor="title" className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Post Title</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField('')}
                    className="custom-input"
                    placeholder="Enter your captivating title..."
                  />
                  <div className="input-glow"></div>
                </div>
              </div>

              {/* Image Upload */}
              <div className={`form-group hover-lift ${focusedField === 'image' ? 'focused' : ''}`}>
                <label htmlFor="image" className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>Post Image</span>
                </label>
                <div className="upload-wrapper">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    onFocus={() => setFocusedField('image')}
                    onBlur={() => setFocusedField('')}
                    className="hidden-input"
                  />
                  <label
                    htmlFor="image"
                    className="upload-area glass-effect slide-shine"
                  >
                    <svg className="upload-icon bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <span className="upload-text">
                      Click to upload an image
                    </span>
                    <span className="upload-subtext">PNG, JPG, GIF up to 10MB</span>
                  </label>
                </div>
                
                {imagePreview && (
                  <div className="image-preview-container fade-in-up">
                    <div className="image-glow"></div>
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="preview-image hover-scale"
                    />
                    <div className="image-overlay"></div>
                  </div>
                )}
              </div>

              {/* Content Editor */}
              <div className={`form-group hover-lift ${focusedField === 'content' ? 'focused' : ''}`}>
                <label htmlFor="content" className="form-label">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  <span>Content</span>
                </label>
                <div className="editor-wrapper">
                  <div className="editor-glow"></div>
                  <div 
                    className="quill-container glass-effect"
                    onFocus={() => setFocusedField('content')}
                    onBlur={() => setFocusedField('')}
                  >
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      className="custom-quill-editor"
                      placeholder="Start writing your amazing content..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="submit-section">
                <button
                  className="submit-button gradient-button hover-lift slide-shine"
                  type="submit"
                  disabled={uploading}
                >
                  <div className="button-content">
                    {uploading ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <svg className="button-icon sparkle-icon pulse-animation" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13,0.5l2.8,8.4l8.7,0l-7,5.1l2.7,8.4L13,17.3l-7,5.1l2.7-8.4l-7-5.1l8.7,0L13,0.5z"/>
                        </svg>
                        <span>Publish Post</span>
                        <svg className="button-icon lightning-icon bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13,0.5l2.8,8.4l8.7,0l-7,5.1l2.7,8.4L13,17.3l-7,5.1l2.7-8.4l-7-5.1l8.7,0L13,0.5z"/>
                        </svg>
                      </>
                    )}
                  </div>
                  <div className="button-shine"></div>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreatePostPage;