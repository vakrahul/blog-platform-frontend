import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all pages and components
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import EditPostPage from './pages/EditPostPage';
import SplashWelcome from './components/SplashWelcome'; // Using your imported component name

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs once when the app starts
    // It sets a timer to hide the splash screen after 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // If the app is still loading, show the splash screen
  if (loading) {
    return <SplashWelcome />;
  }

  // Otherwise, show the main application
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/create-post' element={<CreatePostPage />} />
            <Route path='/post/:postId' element={<PostPage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
            <Route path='/edit-post/:postId' element={<EditPostPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;