import { motion } from 'framer-motion';
import { useState } from 'react';

interface DropPointProps {
  y: number;
}

const DropPoint: React.FC<DropPointProps> = ({ y }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <motion.div
      animate={{
        y,
      }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      className=""
    >
      <motion.div
        animate={{
          scale: isAnimating ? 1.25 : 1,
        }}
        className="relative w-8 opacity-90"
      >
        <div className="absolute top-0 right-0 h-0 w-0 border-t-[10px] border-l-[20px] border-b-[10px] border-solid border-t-transparent border-b-transparent border-l-blue-500" />
        <div className="bg-blue-500 top-0 left-0 rounded-full w-5 h-5 absolute" />
      </motion.div>
    </motion.div>
  );
};

export default DropPoint;
