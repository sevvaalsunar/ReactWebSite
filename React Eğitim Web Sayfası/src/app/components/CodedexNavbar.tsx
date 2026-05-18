import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface CodedexNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function CodedexNavbar({ activeSection, onNavigate }: CodedexNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'baslangic', label: 'BAŞLANGIÇ', color: '#FFE66D' },
    { id: 'tsx', label: 'TSX', color: '#4ECDC4' },
    { id: 'props', label: 'PROPS', color: '#F38181' },
    { id: 'state', label: 'STATE', color: '#95E1D3' },
    { id: 'hooks', label: 'HOOKS', color: '#A8DADC' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
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
          className={`bg-white border-4 border-black transition-all duration-300 ${
            scrolled ? 'hard-shadow' : 'hard-shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="size-12 bg-[#FF6B6B] border-4 border-black flex items-center justify-center hard-shadow-sm">
                <span className="text-2xl">⚛️</span>
              </div>
              <div>
                <div className="pixel-font text-sm text-[#2D2D2D]">
                  REACT
                  <span className="text-[#4ECDC4]">.TSX</span>
                </div>
                <div className="text-xs text-gray-600">Türkçe Rehber</div>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-4 py-2 text-xs pixel-font transition-all border-2 border-black"
                  style={{
                    backgroundColor: activeSection === item.id ? item.color : 'white',
                    boxShadow: activeSection === item.id ? '2px 2px 0 #2D2D2D' : 'none',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-[#2D2D2D]">{item.label}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#FFE66D] border-4 border-black hard-shadow-sm pixel-font text-xs"
            >
              <span className="text-[#2D2D2D]">BAŞLA</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
