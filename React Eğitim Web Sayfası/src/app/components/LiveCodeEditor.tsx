import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, RotateCcw, Eye, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveCodeEditorProps {
  initialCode: string;
  title: string;
  description: string;
}

export function LiveCodeEditor({ initialCode, title, description }: LiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  useEffect(() => {
    runCode();
  }, []);

  const runCode = () => {
    setIsRunning(true);
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(args.map(arg => JSON.stringify(arg, null, 2)).join(' '));
        },
      };

      const func = new Function('customConsole', code);
      func(customConsole);

      setOutput(logs.join('\n') || '✓ Kod başarıyla çalıştırıldı');
    } catch (error) {
      setOutput(`❌ Hata: ${error instanceof Error ? error.message : String(error)}`);
    }

    setTimeout(() => setIsRunning(false), 400);
  };

  const resetCode = () => {
    setCode(initialCode);
    setTimeout(runCode, 100);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-[var(--code-bg)] backdrop-blur-xl rounded-3xl border border-[var(--code-border)] overflow-hidden shadow-2xl">
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCode}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition border border-white/10 group/btn"
                title="Sıfırla"
              >
                <RotateCcw className="size-4 text-gray-400 group-hover/btn:text-white transition" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runCode}
                disabled={isRunning}
                className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition flex items-center gap-2 shadow-lg disabled:opacity-50 font-medium"
              >
                <Play className="size-4" />
                Çalıştır
              </motion.button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative border-r border-white/10">
            <div className="flex items-center gap-2 px-6 py-3 bg-black/20 border-b border-white/10">
              <Code className="size-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Editor</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="size-2 rounded-full bg-red-500" />
                <div className="size-2 rounded-full bg-yellow-500" />
                <div className="size-2 rounded-full bg-green-500" />
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-6 bg-transparent text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-0 custom-scrollbar"
              spellCheck={false}
              style={{
                fontFamily: "'Fira Code', 'Monaco', 'Courier New', monospace",
                lineHeight: '1.6',
              }}
            />
          </div>

          <div className="relative bg-black/30">
            <div className="flex items-center gap-2 px-6 py-3 bg-black/20 border-b border-white/10">
              <Eye className="size-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Çıktı</span>

              <AnimatePresence mode="wait">
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="ml-auto"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="size-1.5 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-96 p-6 overflow-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={output}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {output ? (
                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                      {output}
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                      Kodu çalıştırın...
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
