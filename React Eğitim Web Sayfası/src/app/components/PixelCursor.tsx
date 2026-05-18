import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Trail {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function PixelCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Trail[]>([]);

  const colors = ['#a855f7', '#10b981', '#fb7185', '#60a5fa', '#fbbf24'];

  useEffect(() => {
    let trailId = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      if (now - lastTrailTime > 30) {
        const newTrail: Trail = {
          id: trailId++,
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setTrails((prev) => [...prev, newTrail]);
        lastTrailTime = now;

        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 600,
        }}
      >
        <div className="size-3 bg-white border-2 border-purple-500" style={{ imageRendering: 'pixelated' }} />
      </motion.div>

      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="pointer-events-none fixed z-40"
          initial={{
            x: trail.x - 2,
            y: trail.y - 2,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        >
          <div
            className="size-2"
            style={{
              backgroundColor: trail.color,
              boxShadow: `0 0 8px ${trail.color}`,
              imageRendering: 'pixelated',
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
