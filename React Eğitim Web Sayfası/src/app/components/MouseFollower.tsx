import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
    >
      <div className="size-10 rounded-full bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30 blur-xl" />
    </motion.div>
  );
}
