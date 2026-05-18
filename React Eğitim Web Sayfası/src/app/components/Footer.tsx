import { motion } from 'motion/react';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-gradient-to-t from-[var(--pastel-lavender)]/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="size-5 text-red-500" fill="currentColor" />
            </motion.div>
            <span>and React</span>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition border border-white/40 shadow-lg"
                aria-label={social.label}
              >
                <social.icon className="size-5 text-gray-700" />
              </motion.a>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            © 2026 React Öğren - Tüm hakları saklıdır
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200/50 text-center">
          <p className="text-sm text-gray-600">
            Bu proje, modern React konseptlerini öğrenmek için tasarlanmış etkileşimli bir
            platformdur.
          </p>
        </div>
      </div>
    </footer>
  );
}
