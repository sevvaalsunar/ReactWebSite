import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface PixelNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function PixelNavbar({ activeSection, onNavigate }: PixelNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'intro', label: 'INTRO', color: '#a855f7' },
    { id: 'jsx', label: 'JSX', color: '#10b981' },
    { id: 'props', label: 'PROPS', color: '#fb7185' },
    { id: 'state', label: 'STATE', color: '#60a5fa' },
    { id: 'hooks', label: 'HOOKS', color: '#fbbf24' },
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
          className={`backdrop-blur-xl border-2 transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--background)]/90 border-purple-500/50 shadow-2xl'
              : 'bg-[var(--background)]/70 border-purple-500/30 shadow-lg'
          }`}
          style={{
            boxShadow: scrolled
              ? '0 0 30px rgba(168, 85, 247, 0.3), 4px 4px 0 rgba(0,0,0,0.3)'
              : '0 0 20px rgba(168, 85, 247, 0.2), 4px 4px 0 rgba(0,0,0,0.2)',
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="relative">
                <div
                  className="size-10 bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white/20 flex items-center justify-center"
                  style={{ imageRendering: 'pixelated' }}
                >
                  <span className="text-white text-xl">⚛</span>
                </div>
              </div>
              <div className="pixel-font text-sm text-purple-400">
                REACT<span className="text-white">.TSX</span>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-4 py-2 text-xs pixel-font transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activePixelTab"
                      className="absolute inset-0 border-2"
                      style={{
                        backgroundColor: `${item.color}20`,
                        borderColor: item.color,
                        boxShadow: `0 0 20px ${item.color}40, inset 0 0 20px ${item.color}20`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                  </span>

                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-1"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}`,
                      }}
                      layoutId="pixelUnderline"
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
              className="relative px-6 py-2.5 border-2 border-yellow-400 bg-yellow-400 overflow-hidden group"
              style={{
                boxShadow: '4px 4px 0 rgba(0,0,0,0.3), 0 0 20px rgba(251, 191, 36, 0.4)',
              }}
            >
              <span className="pixel-font text-xs text-black relative z-10">START</span>
              <div className="absolute inset-0 bg-yellow-300 translate-y-full group-hover:translate-y-0 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
