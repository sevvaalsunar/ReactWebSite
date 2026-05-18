import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function MagicCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (Math.random() > 0.7) {
        const newParticle: Particle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
        };

        setParticles((prev) => [...prev, newParticle]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 500,
        }}
      >
        <div className="size-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm opacity-60" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-50"
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="size-12 rounded-full border border-purple-500/30" />
      </motion.div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-40"
          initial={{
            x: particle.x - 3,
            y: particle.y - 3,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            y: particle.y - 30,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
        >
          <div className="size-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500" />
        </motion.div>
      ))}
    </>
  );
}
