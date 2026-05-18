import { motion } from 'motion/react';
import { Star, Zap, Heart } from 'lucide-react';

export function CodedexHero() {
  return (
    <section
      id="baslangic"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-20"
      style={{ background: 'linear-gradient(180deg, #FFF9DB 0%, #FFFCEB 100%)' }}
    >
      <div className="absolute inset-0 opacity-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-8 border-2 border-black"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              imageRendering: 'pixelated',
            }}
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
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
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white border-4 border-black hard-shadow"
          >
            <div className="size-3 bg-[#4ECDC4] border-2 border-black animate-pulse" />
            <span className="text-sm font-semibold text-[#2D2D2D]">
              🎮 Kahramanın Yolculuğu Başlıyor
            </span>
            <div className="px-3 py-1 bg-[#FFE66D] border-2 border-black">
              <span className="pixel-font text-xs text-[#2D2D2D]">2026</span>
            </div>
          </motion.div>

          <div className="mb-8">
            <h1 className="pixel-font text-4xl md:text-6xl mb-6 text-[#2D2D2D] leading-relaxed">
              REACT <span className="text-[#FF6B6B]">&</span> TYPESCRIPT
              <br />
              <span className="text-[#4ECDC4]">MACERASI</span>
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              {[
                { icon: <Star className="size-6" />, color: '#FFE66D' },
                { icon: <Zap className="size-6" />, color: '#4ECDC4' },
                { icon: <Heart className="size-6" />, color: '#F38181' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-4 border-4 border-black hard-shadow-sm"
                  style={{ backgroundColor: item.color }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-lg md:text-xl text-[#2D2D2D] mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Retro oyun estetiğiyle modern web geliştirme! TypeScript ile tip güvenli React
            uygulamaları yazmayı öğrenin.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-[#FF6B6B] border-4 border-black hard-shadow-lg hover:hard-shadow transition-all"
            >
              <span className="pixel-font text-sm text-white flex items-center gap-2">
                MACERAYA BAŞLA
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border-4 border-black hard-shadow hover:hard-shadow-sm transition-all"
            >
              <span className="pixel-font text-sm text-[#2D2D2D]">DÖKÜMANTASYON</span>
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
              title: 'TİP GÜVENLİ',
              desc: 'TypeScript ile %100 tip güvenliği',
              color: '#A8DADC',
            },
            {
              icon: '⚡',
              title: 'ETKİLEŞİMLİ',
              desc: 'Canlı kod örnekleri ve playground',
              color: '#95E1D3',
            },
            {
              icon: '🎮',
              title: 'RETRO-MODERN',
              desc: 'Codedex estetiği ile öğrenin',
              color: '#FFE66D',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group p-6 bg-white border-4 border-black hard-shadow-lg hover:hard-shadow transition-all duration-300"
            >
              <div
                className="inline-block p-3 border-4 border-black mb-4"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-4xl">{item.icon}</span>
              </div>
              <h3 className="pixel-font text-xs mb-3 text-[#2D2D2D]">{item.title}</h3>
              <p className="text-sm text-gray-600 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
