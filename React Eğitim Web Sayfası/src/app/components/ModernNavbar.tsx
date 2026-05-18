import { motion } from 'motion/react';
import { Code2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ModernNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function ModernNavbar({ activeSection, onNavigate }: ModernNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'intro', label: 'Giriş' },
    { id: 'jsx', label: 'JSX' },
    { id: 'props', label: 'Props' },
    { id: 'state', label: 'State' },
    { id: 'hooks', label: 'Hooks' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--background)]/80 border-white/10 shadow-2xl'
              : 'bg-[var(--background)]/60 border-white/5 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50" />
                <div className="relative p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  <Code2 className="size-5 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    React Mastery
                  </span>
                  <Sparkles className="size-4 text-yellow-400" />
                </div>
                <div className="text-xs text-gray-500">Modern UI Edition</div>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-4 py-2 text-sm transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`relative z-10 transition-colors ${
                      activeSection === item.id
                        ? 'text-white font-medium'
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                  </span>

                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg border border-purple-500/30"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      layoutId="underline"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 overflow-hidden rounded-xl text-sm font-medium"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 hover:opacity-100 transition-opacity blur-xl" />
              <span className="relative text-black">Başla</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
