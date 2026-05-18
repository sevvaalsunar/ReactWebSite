import { motion } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

interface LessonCardProps {
  title: string;
  description: string;
  icon: string;
  codeExample: string;
  explanation: string;
  bgColor: string;
}

export function LessonCard({
  title,
  description,
  icon,
  codeExample,
  explanation,
  bgColor,
}: LessonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = (e.clientX - rect.left - rect.width / 2) / 20;
    setTiltAngle({ x, y });
  };

  const handleMouseLeave = () => {
    setTiltAngle({ x: 0, y: 0 });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tiltAngle.x,
        rotateY: tiltAngle.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative p-8 rounded-3xl backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden ${bgColor}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{icon}</div>
            <div>
              <h2 className="text-2xl mb-1">{title}</h2>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed">{explanation}</p>
          </div>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl text-sm hover:bg-white/80 transition"
          >
            {isExpanded ? 'Kodu Gizle' : 'Kodu Göster'}
          </motion.button>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <SyntaxHighlighter
                language="jsx"
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {codeExample}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
