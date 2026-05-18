import { motion } from 'motion/react';
import { Sparkles, Code2, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--pastel-lavender)] via-[var(--pastel-mint)] to-[var(--pastel-blue)] opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg">
            <Sparkles className="size-4 text-purple-600" />
            <span className="text-sm text-purple-700">Modern React Öğrenin</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            React'i Keşfedin
          </h1>

          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Etkileşimli dersler, canlı kod örnekleri ve modern pratiklerle
            React'in temellerini öğrenin.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow flex items-center gap-2"
            >
              <Code2 className="size-5" />
              Öğrenmeye Başla
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/70 backdrop-blur-sm text-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-white/40 flex items-center gap-2"
            >
              <Zap className="size-5" />
              Hızlı Başlangıç
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: "🎨", title: "Etkileşimli", desc: "Öğrendikçe deneyin" },
            { icon: "⚡", title: "Modern", desc: "Güncel React özellikleri" },
            { icon: "🚀", title: "Pratik", desc: "Gerçek projeler" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white/40 shadow-lg"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
