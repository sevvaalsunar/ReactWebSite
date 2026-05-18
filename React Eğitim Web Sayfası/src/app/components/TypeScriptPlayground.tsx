import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, RotateCcw, Terminal, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TypeScriptPlaygroundProps {
  initialCode: string;
  title: string;
  description: string;
  themeColor: string;
}

export function TypeScriptPlayground({
  initialCode,
  title,
  description,
  themeColor,
}: TypeScriptPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    runCode();
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setRunCount((prev) => prev + 1);

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

      setOutput(logs.join('\n') || '✓ Code executed successfully!');
    } catch (error) {
      setOutput(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    }

    setTimeout(() => setIsRunning(false), 400);
  };

  const resetCode = () => {
    setCode(initialCode);
    setRunCount(0);
    setTimeout(runCode, 100);
  };

  return (
    <div className="relative group">
      <div
        className="absolute -inset-1 rounded-lg blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: `linear-gradient(45deg, ${themeColor}, transparent)` }}
      />

      <div
        className="relative bg-[var(--code-bg)] border-2 overflow-hidden"
        style={{
          borderColor: `${themeColor}60`,
          boxShadow: `0 0 30px ${themeColor}40, 4px 4px 0 rgba(0,0,0,0.3)`,
        }}
      >
        <div className="bg-black/40 border-b-2" style={{ borderColor: `${themeColor}40` }}>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h3 className="pixel-font text-xs text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-950/50 border border-purple-500/30">
                <Zap className="size-3 text-purple-400" />
                <span className="text-xs text-purple-300 pixel-font">RUNS: {runCount}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCode}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/20 transition group/btn"
                title="Reset Code"
                style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
              >
                <RotateCcw className="size-4 text-gray-400 group-hover/btn:text-white transition" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runCode}
                disabled={isRunning}
                className="px-5 py-2.5 border-2 border-green-400 bg-green-400/20 hover:bg-green-400/30 transition disabled:opacity-50"
                style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.4), 4px 4px 0 rgba(0,0,0,0.3)' }}
              >
                <span className="flex items-center gap-2 text-green-300 pixel-font text-xs">
                  <Play className="size-3" />
                  RUN
                </span>
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-6 py-2 bg-black/20">
            <div className="flex gap-1.5">
              <div className="size-3 bg-red-500 border border-red-300" style={{ imageRendering: 'pixelated' }} />
              <div className="size-3 bg-yellow-500 border border-yellow-300" style={{ imageRendering: 'pixelated' }} />
              <div className="size-3 bg-green-500 border border-green-300" style={{ imageRendering: 'pixelated' }} />
            </div>
            <span className="text-xs text-gray-500 pixel-font ml-3">EDITOR.TSX</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative border-r-2 border-white/10">
            <div className="flex items-center gap-2 px-6 py-3 bg-black/30 border-b border-white/10">
              <Terminal className="size-4" style={{ color: themeColor }} />
              <span className="text-sm font-medium text-gray-300 pixel-font text-xs">CODE EDITOR</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-6 bg-transparent text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-0 custom-scrollbar"
              spellCheck={false}
              style={{
                fontFamily: "'Fira Code', 'Monaco', 'Courier New', monospace",
                lineHeight: '1.7',
              }}
            />

            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, ${themeColor}, transparent)`,
                boxShadow: `0 0 10px ${themeColor}`,
              }}
            />
          </div>

          <div className="relative bg-black/40">
            <div className="flex items-center gap-2 px-6 py-3 bg-black/30 border-b border-white/10">
              <div className="size-2 bg-green-400 animate-pulse" style={{ imageRendering: 'pixelated' }} />
              <span className="text-sm font-medium text-gray-300 pixel-font text-xs">CONSOLE OUTPUT</span>

              <AnimatePresence mode="wait">
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="ml-auto flex items-center gap-2"
                  >
                    <span className="text-xs text-green-400 pixel-font">RUNNING</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="size-2 bg-green-400"
                          style={{ imageRendering: 'pixelated' }}
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
                      <div className="text-xs text-gray-500 mb-2 pixel-font">$ output</div>
                      <pre
                        className="text-sm font-mono whitespace-pre-wrap leading-relaxed"
                        style={{
                          color: output.startsWith('❌') ? '#fb7185' : '#10b981',
                        }}
                      >
                        {output}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
                      <Terminal className="size-8 mb-2 opacity-50" />
                      <span className="pixel-font text-xs">Press RUN to execute code...</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${themeColor})`,
                boxShadow: `0 0 10px ${themeColor}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
