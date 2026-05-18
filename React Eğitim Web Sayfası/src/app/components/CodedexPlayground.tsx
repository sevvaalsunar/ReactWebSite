import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, RotateCcw, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CodedexPlaygroundProps {
  initialCode: string;
  title: string;
  description: string;
  themeColor: string;
}

export function CodedexPlayground({
  initialCode,
  title,
  description,
  themeColor,
}: CodedexPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    runCode();
  }, []);

  const runCode = () => {
    setIsRunning(true);

    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(
            args
              .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
              .join(' ')
          );
        },
      };

      const func = new Function('customConsole', code);
      func(customConsole);

      setOutput(logs.join('\n') || '✓ Kod başarıyla çalıştırıldı!');
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
    <div className="relative">
      <div className="bg-white border-4 border-black hard-shadow-lg overflow-hidden">
        <div className="bg-[#2D2D2D] border-b-4 border-black px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="pixel-font text-xs text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resetCode}
                className="p-2.5 bg-white border-2 border-black hover:bg-gray-100 transition"
                title="Sıfırla"
              >
                <RotateCcw className="size-4 text-[#2D2D2D]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={runCode}
                disabled={isRunning}
                className="px-5 py-2.5 bg-[#4ECDC4] border-4 border-black hard-shadow-sm disabled:opacity-50"
              >
                <span className="flex items-center gap-2 text-white pixel-font text-xs">
                  <Play className="size-3" />
                  ÇALIŞTIR
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative border-r-4 border-black bg-[#FFFCEB]">
            <div className="flex items-center gap-2 px-6 py-3 bg-white border-b-4 border-black">
              <div className="size-2 bg-[#FFE66D] border-2 border-black" />
              <span className="text-sm font-semibold text-[#2D2D2D] pixel-font text-xs">
                KOD EDİTÖRÜ
              </span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-6 bg-transparent text-[#2D2D2D] font-mono text-sm resize-none focus:outline-none custom-scrollbar border-4 border-transparent focus:border-[#FFE66D]"
              spellCheck={false}
              style={{
                fontFamily: "'Fira Code', 'Monaco', 'Courier New', monospace",
                lineHeight: '1.7',
              }}
            />
          </div>

          <div className="relative bg-[#2D2D2D]">
            <div className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] border-b-4 border-black">
              <Terminal className="size-4 text-[#4ECDC4]" />
              <span className="text-sm font-semibold text-white pixel-font text-xs">
                KONSOL ÇIKTISI
              </span>

              <AnimatePresence mode="wait">
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="ml-auto flex items-center gap-2"
                  >
                    <span className="text-xs text-[#4ECDC4] pixel-font">ÇALIŞIYOR</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="size-2 bg-[#4ECDC4] border border-black"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
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
                    <div>
                      <div className="text-xs text-gray-500 mb-2 pixel-font">$ çıktı</div>
                      <pre
                        className="text-sm font-mono whitespace-pre-wrap leading-relaxed"
                        style={{
                          color: output.startsWith('❌') ? '#F38181' : '#95E1D3',
                        }}
                      >
                        {output}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <Terminal className="size-8 mb-3 opacity-30" />
                      <span className="text-sm">Kodu çalıştırmak için ÇALIŞTIR butonuna basın</span>
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
