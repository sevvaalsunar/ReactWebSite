import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function PixelHero() {
  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[var(--background)] to-[var(--background)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
      </div>

      <div className="absolute inset-0 opacity-10" style={{ imageRendering: 'pixelated' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-4 border border-purple-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-purple-950/50 backdrop-blur-sm border-2 border-purple-500/30 relative group"
            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
          >
            <div className="size-2 bg-green-400 animate-pulse" style={{ imageRendering: 'pixelated' }} />
            <span className="text-sm text-purple-300 font-medium">TYPESCRIPT REACT TUTORIAL</span>
            <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30">
              <span className="text-xs text-purple-300 pixel-font">v2026</span>
            </div>
          </motion.div>

          <h1 className="mb-8">
            <div className="pixel-font text-3xl md:text-5xl mb-4 leading-relaxed">
              <span className="inline-block" style={{ color: '#a855f7', textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 2px 2px 0 rgba(0,0,0,0.5)' }}>
                MASTER
              </span>
            </div>
            <div className="pixel-font text-4xl md:text-6xl mb-4 leading-relaxed">
              <span className="inline-block" style={{ color: '#10b981', textShadow: '0 0 20px rgba(16, 185, 129, 0.8), 2px 2px 0 rgba(0,0,0,0.5)' }}>
                REACT
              </span>
              <span className="text-white mx-3">+</span>
              <span className="inline-block" style={{ color: '#fb7185', textShadow: '0 0 20px rgba(251, 113, 133, 0.8), 2px 2px 0 rgba(0,0,0,0.5)' }}>
                TYPESCRIPT
              </span>
            </div>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            8-bit estetiği ile modern TypeScript. Profesyonel düzeyde React geliştirme için
            derinlemesine TSX eğitimi.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 border-2 border-purple-500 bg-purple-500/20 backdrop-blur-sm overflow-hidden"
              style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), 4px 4px 0 rgba(0,0,0,0.3)' }}
            >
              <div className="absolute inset-0 bg-purple-500/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-3 text-white font-semibold pixel-font text-xs">
                START LEARNING
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-400/50 bg-cyan-950/30 backdrop-blur-sm text-cyan-300 hover:bg-cyan-950/50 transition"
              style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3), 4px 4px 0 rgba(0,0,0,0.3)' }}
            >
              <span className="font-semibold pixel-font text-xs">VIEW DOCS</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '📘',
              title: 'TYPE-SAFE',
              desc: 'Full TypeScript coverage',
              color: '#a855f7',
            },
            {
              icon: '⚡',
              title: 'INTERACTIVE',
              desc: 'Live code playgrounds',
              color: '#10b981',
            },
            {
              icon: '🎮',
              title: 'RETRO-MODERN',
              desc: '8-bit meets professional UI',
              color: '#fb7185',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 bg-white/5 backdrop-blur-xl border-2 border-white/10 hover:border-opacity-30 transition-all duration-300"
              style={{
                borderColor: `${item.color}40`,
                boxShadow: `0 0 20px ${item.color}20, 4px 4px 0 rgba(0,0,0,0.2)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to bottom, ${item.color}10, transparent)` }} />
              <div className="relative">
                <div className="text-5xl mb-4 float-animation">{item.icon}</div>
                <h3 className="pixel-font text-xs mb-3" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
