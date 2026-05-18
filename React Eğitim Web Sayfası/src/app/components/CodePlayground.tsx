import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface CodePlaygroundProps {
  initialCode: string;
  title: string;
}

export function CodePlayground({ initialCode, title }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        },
      };

      const func = new Function('customConsole', code);
      func(customConsole);

      setOutput(logs.join('\n') || 'Kod başarıyla çalıştırıldı!');
    } catch (error) {
      setOutput(`Hata: ${error instanceof Error ? error.message : String(error)}`);
    }
    setTimeout(() => setIsRunning(false), 300);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg flex items-center gap-2">
          <span className="text-2xl">💻</span>
          {title}
        </h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetCode}
            className="p-2 bg-gray-200/60 backdrop-blur-sm rounded-xl hover:bg-gray-300/60 transition"
          >
            <RotateCcw className="size-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={runCode}
            disabled={isRunning}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
          >
            <Play className="size-4" />
            Çalıştır
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute top-3 left-3 text-xs text-gray-400 z-10">JavaScript</div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 pt-10 bg-gray-900 text-gray-100 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            spellCheck={false}
          />
        </div>

        <div className="bg-gray-900 rounded-2xl p-4 h-64 overflow-auto">
          <div className="text-xs text-gray-400 mb-2">Çıktı</div>
          {output ? (
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">{output}</pre>
          ) : (
            <div className="text-gray-500 text-sm">Kodu çalıştırın...</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
