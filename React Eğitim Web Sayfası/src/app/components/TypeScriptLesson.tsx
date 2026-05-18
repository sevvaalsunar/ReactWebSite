import { motion } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ScrollReveal } from './ScrollReveal';
import { TypeScriptPlayground } from './TypeScriptPlayground';
import { Code, BookOpen, AlertTriangle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TypeScriptLessonProps {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  level: number;
  color: string;
  sections: {
    why: {
      title: string;
      points: string[];
    };
    how: {
      title: string;
      description: string;
      codeExample: string;
    };
    typescript: {
      title: string;
      features: Array<{
        name: string;
        description: string;
        code: string;
      }>;
    };
    pitfalls: {
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

export function TypeScriptLesson({
  id,
  title,
  emoji,
  subtitle,
  level,
  color,
  sections,
  playground,
}: TypeScriptLessonProps) {
  const triggerLevelUp = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#10b981', '#fb7185', '#60a5fa', '#fbbf24'],
    });
  };

  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="relative mb-16">
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />

            <div className="flex items-start justify-between flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="relative"
                >
                  <div
                    className="size-24 border-4 flex items-center justify-center"
                    style={{
                      backgroundColor: `${color}20`,
                      borderColor: color,
                      boxShadow: `0 0 30px ${color}60, 4px 4px 0 rgba(0,0,0,0.4)`,
                      imageRendering: 'pixelated',
                    }}
                  >
                    <span className="text-5xl">{emoji}</span>
                  </div>
                  <div
                    className="absolute -top-2 -right-2 px-3 py-1 border-2 pixel-font text-xs"
                    style={{
                      backgroundColor: color,
                      borderColor: 'white',
                      color: 'white',
                      boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                    }}
                  >
                    LV.{level}
                  </div>
                </motion.div>

                <div>
                  <h2
                    className="pixel-font text-3xl md:text-4xl mb-3"
                    style={{ color, textShadow: `0 0 20px ${color}80, 2px 2px 0 rgba(0,0,0,0.5)` }}
                  >
                    {title}
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl">{subtitle}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerLevelUp}
                className="group relative px-6 py-3 border-2 border-yellow-400 bg-yellow-400/20 backdrop-blur-sm overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.4), 4px 4px 0 rgba(0,0,0,0.3)' }}
              >
                <div className="absolute inset-0 bg-yellow-400/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2 text-yellow-300 pixel-font text-xs">
                  <Trophy className="size-4" />
                  LEVEL UP!
                </span>
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <ScrollReveal delay={0.1}>
            <div
              className="lg:col-span-2 p-8 bg-white/5 backdrop-blur-xl border-2 h-full"
              style={{
                borderColor: `${color}40`,
                boxShadow: `0 0 20px ${color}20, 4px 4px 0 rgba(0,0,0,0.2)`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 border-2 border-blue-400" style={{ backgroundColor: '#60a5fa20' }}>
                  <BookOpen className="size-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white pixel-font text-sm">{sections.why.title}</h3>
              </div>

              <div className="space-y-4">
                {sections.why.points.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div
                      className="mt-1.5 size-3 flex-shrink-0 border-2"
                      style={{
                        backgroundColor: color,
                        borderColor: 'white',
                        boxShadow: `0 0 10px ${color}`,
                        imageRendering: 'pixelated',
                      }}
                    />
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div
              className="p-6 border-2"
              style={{
                background: `linear-gradient(135deg, ${color}15, transparent)`,
                borderColor: `${color}60`,
                boxShadow: `0 0 30px ${color}30, inset 0 0 30px ${color}10, 4px 4px 0 rgba(0,0,0,0.2)`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 border-2 border-purple-400" style={{ backgroundColor: '#a855f720' }}>
                  <Code className="size-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white pixel-font text-xs">QUICK STATS</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-black/30 border border-white/10">
                  <div className="text-xs text-purple-400 mb-1 pixel-font">DIFFICULTY</div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="size-4 border-2"
                        style={{
                          backgroundColor: i < level ? color : 'transparent',
                          borderColor: color,
                          imageRendering: 'pixelated',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-black/30 border border-white/10">
                  <div className="text-xs text-green-400 mb-2 pixel-font">STATUS</div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-green-400 animate-pulse" style={{ imageRendering: 'pixelated' }} />
                    <span className="text-green-300 text-sm">Ready to Learn</span>
                  </div>
                </div>

                <div className="p-4 bg-black/30 border border-white/10">
                  <div className="text-xs text-yellow-400 mb-2 pixel-font">TYPE</div>
                  <div className="inline-block px-3 py-1 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs">
                    TYPESCRIPT
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div
            className="p-8 bg-white/5 backdrop-blur-xl border-2 mb-12"
            style={{
              borderColor: `${color}40`,
              boxShadow: `0 0 20px ${color}20, 4px 4px 0 rgba(0,0,0,0.2)`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border-2 border-green-400" style={{ backgroundColor: '#10b98120' }}>
                <Code className="size-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white pixel-font text-sm">{sections.how.title}</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">{sections.how.description}</p>

            <div className="border-2 border-purple-500/30 overflow-hidden" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.1)' }}>
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  fontSize: '0.875rem',
                }}
                showLineNumbers
              >
                {sections.how.codeExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div
            className="p-8 border-2 mb-12"
            style={{
              background: `linear-gradient(135deg, #a855f715, transparent)`,
              borderColor: '#a855f760',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(168, 85, 247, 0.1), 4px 4px 0 rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 border-2 border-purple-400" style={{ backgroundColor: '#a855f720' }}>
                <Code className="size-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white pixel-font text-sm">{sections.typescript.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.typescript.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-black/40 border border-purple-400/30 hover:border-purple-400/60 transition group"
                  style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
                >
                  <h4 className="pixel-font text-xs text-purple-400 mb-3">{feature.name}</h4>
                  <p className="text-gray-300 text-sm mb-4">{feature.description}</p>

                  <div className="border border-purple-500/20 overflow-hidden">
                    <SyntaxHighlighter
                      language="tsx"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '0.75rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {feature.code}
                    </SyntaxHighlighter>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div
            className="p-8 border-2 mb-12"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), transparent)',
              borderColor: 'rgba(239, 68, 68, 0.4)',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.2), 4px 4px 0 rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 border-2 border-red-400" style={{ backgroundColor: '#ef444420' }}>
                <AlertTriangle className="size-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white pixel-font text-sm">{sections.pitfalls.title}</h3>
            </div>

            <div className="space-y-6">
              {sections.pitfalls.items.map((item, i) => (
                <div key={i} className="p-6 bg-black/40 border border-red-400/20" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
                  <h4 className="pixel-font text-xs text-red-400 mb-3">
                    ERROR #{i + 1}: {item.title}
                  </h4>
                  <p className="text-gray-300 mb-4">{item.description}</p>

                  {item.wrong && item.right && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-red-400 mb-2 pixel-font flex items-center gap-2">
                          <span className="inline-block size-3 bg-red-400 border border-white" style={{ imageRendering: 'pixelated' }} />
                          WRONG
                        </div>
                        <div className="border border-red-500/30 overflow-hidden">
                          <SyntaxHighlighter
                            language="tsx"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              padding: '0.75rem',
                              fontSize: '0.75rem',
                              background: 'rgba(220, 38, 38, 0.15)',
                            }}
                          >
                            {item.wrong}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-green-400 mb-2 pixel-font flex items-center gap-2">
                          <span className="inline-block size-3 bg-green-400 border border-white" style={{ imageRendering: 'pixelated' }} />
                          CORRECT
                        </div>
                        <div className="border border-green-500/30 overflow-hidden">
                          <SyntaxHighlighter
                            language="tsx"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              padding: '0.75rem',
                              fontSize: '0.75rem',
                              background: 'rgba(34, 197, 94, 0.15)',
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
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  🎮
                </motion.div>
                <h3 className="text-2xl font-bold text-white pixel-font text-sm">INTERACTIVE PLAYGROUND</h3>
              </div>

              <div className="px-4 py-2 bg-green-500/20 border-2 border-green-400" style={{ boxShadow: '0 0 15px rgba(16, 185, 129, 0.3), 2px 2px 0 rgba(0,0,0,0.3)' }}>
                <span className="text-xs text-green-300 pixel-font flex items-center gap-2">
                  <span className="size-2 bg-green-400 animate-pulse" style={{ imageRendering: 'pixelated' }} />
                  LIVE CODE
                </span>
              </div>
            </div>
          </div>

          <TypeScriptPlayground
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
