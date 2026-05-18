import { motion } from 'motion/react';
import { AlertCircle, BookOpen, Bug, Lightbulb } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LiveCodeEditor } from './LiveCodeEditor';
import { ScrollReveal } from './ScrollReveal';

interface DetailedLessonProps {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  whySection: {
    title: string;
    content: string[];
  };
  howSection: {
    title: string;
    content: string;
    codeExample: string;
  };
  errorsSection: {
    title: string;
    errors: Array<{
      title: string;
      description: string;
      badCode?: string;
      goodCode?: string;
    }>;
  };
  playground: {
    code: string;
    title: string;
    description: string;
  };
}

export function DetailedLesson({
  id,
  title,
  emoji,
  subtitle,
  whySection,
  howSection,
  errorsSection,
  playground,
}: DetailedLessonProps) {
  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="text-7xl">{emoji}</div>
            </motion.div>

            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <ScrollReveal delay={0.1}>
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Lightbulb className="size-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{whySection.title}</h3>
                </div>

                <div className="space-y-4">
                  {whySection.content.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1.5 size-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <AlertCircle className="size-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Önemli Notlar</h3>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-medium text-yellow-400 mb-2">💡 Pro Tip</div>
                  <p className="text-gray-400">
                    React'in en güçlü özelliklerinden biri, bu konsepti diğer hook'larla
                    birleştirerek karmaşık durumları yönetebilmenizdir.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-medium text-green-400 mb-2">✓ Best Practice</div>
                  <p className="text-gray-400">
                    Her zaman anlamlı değişken isimleri kullanın ve durum değişikliklerini
                    immutable (değiştirilemez) tutun.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <BookOpen className="size-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{howSection.title}</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">{howSection.content}</p>

            <div className="rounded-2xl overflow-hidden border border-purple-500/20">
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  fontSize: '0.875rem',
                }}
                showLineNumbers
              >
                {howSection.codeExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="bg-gradient-to-br from-red-950/30 to-orange-950/30 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Bug className="size-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{errorsSection.title}</h3>
            </div>

            <div className="space-y-6">
              {errorsSection.errors.map((error, i) => (
                <div key={i} className="bg-black/30 rounded-xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-red-400 mb-3">
                    {i + 1}. {error.title}
                  </h4>
                  <p className="text-gray-300 mb-4">{error.description}</p>

                  {error.badCode && error.goodCode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-red-400 mb-2 font-medium">❌ Yanlış:</div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="jsx"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              padding: '1rem',
                              fontSize: '0.75rem',
                              background: 'rgba(220, 38, 38, 0.1)',
                            }}
                          >
                            {error.badCode}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-green-400 mb-2 font-medium">✓ Doğru:</div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="jsx"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              padding: '1rem',
                              fontSize: '0.75rem',
                              background: 'rgba(34, 197, 94, 0.1)',
                            }}
                          >
                            {error.goodCode}
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

        <ScrollReveal delay={0.5}>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎮
                </motion.div>
              </div>
              <h3 className="text-2xl font-semibold text-white">Canlı Playground</h3>
              <div className="ml-auto px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                <span className="text-xs text-green-400 font-medium">Interaktif</span>
              </div>
            </div>
          </div>

          <LiveCodeEditor
            initialCode={playground.code}
            title={playground.title}
            description={playground.description}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
