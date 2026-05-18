import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function CodedexCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors = ['#FFE66D', '#95E1D3', '#A8DADC', '#F38181', '#FFB6C1', '#4ECDC4'];

  useEffect(() => {
    let particleId = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      if (now - lastTrailTime > 40) {
        const newParticle: Particle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setParticles((prev) => [...prev, newParticle]);
        lastTrailTime = now;

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 600);
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
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 500,
        }}
      >
        <div
          className="size-5 bg-white border-2 border-black"
          style={{ imageRendering: 'pixelated' }}
        />
      </motion.div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-40 border-2 border-black"
          initial={{
            x: particle.x - 4,
            y: particle.y - 4,
            opacity: 0.9,
            scale: 1,
          }}
          animate={{
            y: particle.y + 20,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          <div
            className="size-2"
            style={{
              backgroundColor: particle.color,
              imageRendering: 'pixelated',
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
