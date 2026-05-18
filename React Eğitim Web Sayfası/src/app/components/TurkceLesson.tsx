import { motion } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ScrollReveal } from './ScrollReveal';
import { CodedexPlayground } from './CodedexPlayground';
import { BookOpen, Code, AlertCircle, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TurkceLessonProps {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  level: number;
  color: string;
  sections: {
    theory: {
      title: string;
      content: string[];
    };
    code: {
      title: string;
      description: string;
      example: string;
    };
    typescript: {
      title: string;
      items: Array<{
        name: string;
        description: string;
        code: string;
      }>;
    };
    mistakes: {
      title: string;
      items: Array<{
        title: string;
        description: string;
        wrong?: string;
        right?: string;
      }>;
    };
  };
  playground: {
    code: string;
    title: string;
    description: string;
  };
}

export function TurkceLesson({
  id,
  title,
  emoji,
  subtitle,
  level,
  color,
  sections,
  playground,
}: TurkceLessonProps) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFE66D', '#95E1D3', '#A8DADC', '#F38181', '#FFB6C1', '#4ECDC4'],
    });
  };

  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="relative mb-16">
            <div
              className="absolute top-0 left-0 w-full h-2 border-2 border-black"
              style={{ backgroundColor: color }}
            />

            <div className="flex items-start justify-between flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="relative"
                >
                  <div
                    className="size-24 border-4 border-black flex items-center justify-center hard-shadow-lg"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-5xl">{emoji}</span>
                  </div>
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#FFE66D] border-4 border-black pixel-font text-xs hard-shadow-sm">
                    SEVİYE {level}
                  </div>
                </motion.div>

                <div>
                  <h2 className="pixel-font text-3xl md:text-4xl mb-3 text-[#2D2D2D]">{title}</h2>
                  <p className="text-lg text-gray-600 max-w-2xl font-medium">{subtitle}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerConfetti}
                className="group px-6 py-3 bg-[#FFE66D] border-4 border-black hard-shadow-lg hover:hard-shadow transition-all"
              >
                <span className="flex items-center gap-2 text-[#2D2D2D] pixel-font text-xs">
                  <Trophy className="size-4" />
                  SEVİYE TAMAMLA!
                </span>
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <ScrollReveal delay={0.1}>
            <div className="lg:col-span-2 p-8 bg-white border-4 border-black hard-shadow-lg h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#A8DADC] border-4 border-black">
                  <BookOpen className="size-6 text-[#2D2D2D]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] pixel-font text-sm">
                  {sections.theory.title}
                </h3>
              </div>

              <div className="space-y-4">
                {sections.theory.content.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div
                      className="mt-1.5 size-3 border-2 border-black flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-gray-700 leading-relaxed font-medium">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-6 bg-white border-4 border-black hard-shadow-lg" style={{ backgroundColor: `${color}20` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white border-4 border-black">
                  <Star className="size-6" style={{ color }} />
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] pixel-font text-xs">
                  SEVİYE BİLGİLERİ
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white border-2 border-black">
                  <div className="text-xs text-gray-600 mb-2 pixel-font">ZORLUK</div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="size-5 border-2 border-black"
                        style={{
                          backgroundColor: i < level ? color : 'white',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white border-2 border-black">
                  <div className="text-xs text-gray-600 mb-2 pixel-font">DURUM</div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 bg-[#4ECDC4] border-2 border-black animate-pulse" />
                    <span className="text-sm text-[#2D2D2D] font-semibold">
                      Öğrenmeye Hazır
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white border-2 border-black">
                  <div className="text-xs text-gray-600 mb-2 pixel-font">TİP</div>
                  <div className="inline-block px-3 py-1 bg-[#FFE66D] border-2 border-black text-[#2D2D2D] text-xs font-bold">
                    TYPESCRIPT
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="p-8 bg-white border-4 border-black hard-shadow-lg mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#95E1D3] border-4 border-black">
                <Code className="size-6 text-[#2D2D2D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2D2D] pixel-font text-sm">
                {sections.code.title}
              </h3>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed font-medium">
              {sections.code.description}
            </p>

            <div className="border-4 border-black overflow-hidden">
              <SyntaxHighlighter
                language="tsx"
                style={okaidia}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: '#2D2D2D',
                  fontSize: '0.875rem',
                }}
                showLineNumbers
              >
                {sections.code.example}
              </SyntaxHighlighter>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="p-8 bg-white border-4 border-black hard-shadow-lg mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#4ECDC4] border-4 border-black">
                <Code className="size-6 text-[#2D2D2D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2D2D] pixel-font text-sm">
                {sections.typescript.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.typescript.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-[#FFFCEB] border-4 border-black hard-shadow hover:hard-shadow-sm transition-all"
                >
                  <h4 className="pixel-font text-xs text-[#2D2D2D] mb-3">{item.name}</h4>
                  <p className="text-gray-700 text-sm mb-4 font-medium">{item.description}</p>

                  <div className="border-2 border-black overflow-hidden">
                    <SyntaxHighlighter
                      language="tsx"
                      style={okaidia}
                      customStyle={{
                        margin: 0,
                        padding: '0.75rem',
                        background: '#2D2D2D',
                        fontSize: '0.75rem',
                      }}
                    >
                      {item.code}
                    </SyntaxHighlighter>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="p-8 bg-[#F38181] border-4 border-black hard-shadow-lg mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white border-4 border-black">
                <AlertCircle className="size-6 text-[#F38181]" />
              </div>
              <h3 className="text-2xl font-bold text-white pixel-font text-sm">
                {sections.mistakes.title}
              </h3>
            </div>

            <div className="space-y-6">
              {sections.mistakes.items.map((item, i) => (
                <div key={i} className="p-6 bg-white border-4 border-black hard-shadow">
                  <h4 className="pixel-font text-xs text-[#F38181] mb-3">
                    HATA #{i + 1}: {item.title}
                  </h4>
                  <p className="text-gray-700 mb-4 font-medium">{item.description}</p>

                  {item.wrong && item.right && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-[#F38181] mb-2 pixel-font flex items-center gap-2">
                          <span className="inline-block size-3 bg-[#F38181] border-2 border-black" />
                          YANLIŞ
                        </div>
                        <div className="border-2 border-black overflow-hidden">
                          <SyntaxHighlighter
                            language="tsx"
                            style={okaidia}
                            customStyle={{
                              margin: 0,
                              padding: '0.75rem',
                              fontSize: '0.75rem',
                              background: '#3D2D2D',
                            }}
                          >
                            {item.wrong}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-[#4ECDC4] mb-2 pixel-font flex items-center gap-2">
                          <span className="inline-block size-3 bg-[#4ECDC4] border-2 border-black" />
                          DOĞRU
                        </div>
                        <div className="border-2 border-black overflow-hidden">
                          <SyntaxHighlighter
                            language="tsx"
                            style={okaidia}
                            customStyle={{
                              margin: 0,
                              padding: '0.75rem',
                              fontSize: '0.75rem',
                              background: '#2D3D3D',
                            }}
                          >
                            {item.right}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  🎮
                </motion.div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] pixel-font text-sm">
                  ETKİLEŞİMLİ OYUN ALANI
                </h3>
              </div>

              <div className="px-4 py-2 bg-[#4ECDC4] border-4 border-black hard-shadow-sm">
                <span className="text-xs text-white pixel-font flex items-center gap-2">
                  <span className="size-2 bg-white animate-pulse" />
                  CANLI KOD
                </span>
              </div>
            </div>
          </div>

          <CodedexPlayground
            initialCode={playground.code}
            title={playground.title}
            description={playground.description}
            themeColor={color}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
