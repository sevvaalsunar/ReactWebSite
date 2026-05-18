import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export function ModernHero() {
  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 size-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-yellow-600/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-purple-950/50 backdrop-blur-sm border border-purple-500/20 shadow-lg"
          >
            <Sparkles className="size-4 text-yellow-400" />
            <span className="text-sm text-purple-300">Profesyonel React Eğitimi</span>
            <div className="px-2 py-0.5 bg-yellow-400/20 rounded-full">
              <span className="text-xs text-yellow-300">2026</span>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              React'i
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Derinlemesine
            </span>
            <br />
            <span className="text-white">Öğrenin</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Modern UI trendleri ile birleştirilmiş profesyonel React eğitimi.
            Her konsepti teoriden pratiğe, detaylı açıklamalarla öğrenin.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <span className="relative flex items-center gap-2 text-white font-medium">
                Öğrenmeye Başla
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm text-gray-200 rounded-2xl border border-white/10 hover:bg-white/10 transition flex items-center gap-2"
            >
              <Zap className="size-5" />
              Hızlı Başlangıç
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
              icon: '🎯',
              title: 'Derinlemesine',
              desc: 'Her konseptin arkasındaki mantığı öğrenin',
            },
            {
              icon: '⚡',
              title: 'Canlı Örnekler',
              desc: 'Anlık çalışan kod örnekleriyle pratik yapın',
            },
            {
              icon: '🚀',
              title: 'Modern UI',
              desc: 'Linear ve Vercel tarzı profesyonel tasarım',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
