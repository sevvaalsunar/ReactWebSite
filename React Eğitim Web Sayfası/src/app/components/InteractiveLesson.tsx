import { useState } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { CodePlayground } from './CodePlayground';
import { Heart, ThumbsUp, Star } from 'lucide-react';

export function InteractiveLesson() {
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const initialCode = `// useState hook'u ile sayaç oluştur
let count = 0;

function increment() {
  count = count + 1;
  console.log("Sayaç: " + count);
}

increment();
increment();
increment();`;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[var(--pastel-mint)]/20">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="text-6xl">🎯</div>
            </motion.div>
            <h2 className="text-4xl mb-4">useState Hook'u ile Tanışın</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              React'te durum yönetimi için en temel hook. Bileşenlerinize dinamik değerler ekleyin!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ScrollReveal delay={0.2}>
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
              <h3 className="text-2xl mb-6 flex items-center gap-2">
                <span className="text-3xl">📚</span>
                Konsept
              </h3>

              <div className="space-y-4 text-gray-700">
                <p>
                  <strong className="text-purple-600">useState</strong>, React bileşenlerinizde
                  değişken değerleri saklamanızı ve bu değerler değiştiğinde bileşeni yeniden
                  render etmenizi sağlar.
                </p>

                <div className="bg-gradient-to-r from-[var(--pastel-lavender)] to-[var(--pastel-blue)] p-4 rounded-2xl">
                  <code className="text-sm">
                    const [değer, değeriGüncelle] = useState(başlangıçDeğeri)
                  </code>
                </div>

                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <Star className="size-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span><strong>değer:</strong> Mevcut durum değeri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="size-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span><strong>değeriGüncelle:</strong> Durumu güncelleyen fonksiyon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="size-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span><strong>başlangıçDeğeri:</strong> İlk render'daki değer</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
              <h3 className="text-2xl mb-6 flex items-center gap-2">
                <span className="text-3xl">🎮</span>
                Canlı Demo
              </h3>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <div className="text-center mb-4">
                    <div className="text-6xl font-bold text-purple-600 mb-2">{count}</div>
                    <p className="text-gray-600">Mevcut Sayaç Değeri</p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCount(count - 1)}
                      className="px-6 py-3 bg-red-400 text-white rounded-xl shadow-lg hover:shadow-xl transition text-2xl"
                    >
                      -
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCount(0)}
                      className="px-6 py-3 bg-gray-400 text-white rounded-xl shadow-lg hover:shadow-xl transition"
                    >
                      Sıfırla
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCount(count + 1)}
                      className="px-6 py-3 bg-green-400 text-white rounded-xl shadow-lg hover:shadow-xl transition text-2xl"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 mb-1">Beğeni Sayısı</p>
                      <div className="text-3xl font-bold text-blue-600">{likes}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLike}
                      className={`p-4 rounded-full shadow-lg transition ${
                        isLiked
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="size-8" fill={isLiked ? 'currentColor' : 'none'} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.6}>
          <CodePlayground
            title="useState ile Deney Yapın"
            initialCode={initialCode}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
