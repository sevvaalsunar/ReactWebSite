import { motion } from 'motion/react';
import { Code2, Sparkles, BookOpen, Zap } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Ana Sayfa', icon: Code2 },
    { id: 'lessons', label: 'Dersler', icon: BookOpen },
    { id: 'interactive', label: 'İnteraktif', icon: Zap },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/50 shadow-2xl">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-xl">React Öğren</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/40 text-gray-700 hover:bg-white/60'
                  }`}
                >
                  <item.icon className="size-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg text-sm"
            >
              Başla
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
