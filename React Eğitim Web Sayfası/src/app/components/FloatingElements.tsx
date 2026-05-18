import { motion } from 'motion/react';

export function FloatingElements() {
  const elements = [
    { emoji: '⚛️', x: '10%', y: '20%', duration: 3 },
    { emoji: '🎨', x: '85%', y: '15%', duration: 4 },
    { emoji: '✨', x: '15%', y: '70%', duration: 3.5 },
    { emoji: '🚀', x: '80%', y: '65%', duration: 4.5 },
    { emoji: '💜', x: '50%', y: '40%', duration: 3.8 },
    { emoji: '🔥', x: '25%', y: '45%', duration: 4.2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
}
