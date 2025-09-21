import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const PostItem = ({ post }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Use a default image if the post doesn't have one
  const imageUrl = post.imageUrl 
    ? `http://localhost:5001${post.imageUrl}` 
    : 'https://via.placeholder.com/400x200?text=No+Image';

  return (
    <motion.div variants={variants} initial='hidden' animate='visible'>
      <div className='post-card'>
        <Link to={`/post/${post._id}`}>
          <motion.img
            src={imageUrl}
            alt={post.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        <div className='card-content'>
          <Link to={`/post/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>
            <FaUserCircle />
            <Link to={`/profile/${post.author._id}`}>{post.author.name}</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PostItem;