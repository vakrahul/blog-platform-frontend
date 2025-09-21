import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashWelcome = ({ onComplete }) => {
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [showMainText, setShowMainText] = useState(false);

  const tags = [
    "Innovation",
    "Creativity", 
    "Inspiration",
    "Discovery",
    "Imagination",
    "Vision",
    "Dreams",
    "Ideas"
  ];

  useEffect(() => {
    const tagInterval = setInterval(() => {
      setCurrentTagIndex((prev) => {
        if (prev < tags.length - 1) {
          return prev + 1;
        } else {
          clearInterval(tagInterval);
          setShowMainText(true);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(tagInterval);
  }, []);

  useEffect(() => {
    if (showMainText) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMainText, onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="splash-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleSkip}
      >
        <div className="splash-content">
          <div className="tags-container">
            {tags.map((tag, index) => (
              <motion.span
                key={tag}
                className={`splash-tag ${index <= currentTagIndex ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: index <= currentTagIndex ? 1 : 0.3,
                  scale: index <= currentTagIndex ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          <AnimatePresence>
            {showMainText && (
              <motion.div
                className="splash-main-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1>Where Ideas Come From</h1>
                <p>Welcome to your creative space</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="splash-skip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>Click anywhere to continue</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashWelcome;