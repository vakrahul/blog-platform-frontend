import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaPenSquare } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Blog.</Link>
      </div>
      <ul>
        {user ? (
          <>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to='/create-post'>
                <FaPenSquare /> Create Post
              </Link>
            </motion.li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </motion.li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;