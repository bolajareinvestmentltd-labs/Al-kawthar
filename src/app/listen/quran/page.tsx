'use client';

import { useAudioStore } from '@/store/useAudioStore';
import { motion, AnimatePresence } from 'framer-motion';

const surahs = [
  { id: 1, name: 'Al-Fatiha' },
  { id: 2, name: 'Al-Baqarah' },
  { id: 3, name: 'Aal-E-Imran' },
];

export default function ListenPage() {
  const { setQueue, currentSurahId, isPlaying } = useAudioStore();

  const handlePlaySurah = (surahId: number) => {
    const mockAyahs = [{ number: 1, audio: 'https://server8.mp3quran.net/afs/001.mp3', text: '...' }];
    setQueue(mockAyahs, surahId);
  };

  return (
    <main className="p-6 pb-32">
      <h1 className="text-2xl font-serif mb-6">Master Playlist</h1>
      <div className="space-y-4">
        {surahs.map((surah) => {
          const isActive = currentSurahId === surah.id;
          return (
            <button
              key={surah.id}
              onClick={() => handlePlaySurah(surah.id)}
              className="relative w-full text-left p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-all overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <span className={`font-medium ${isActive ? 'text-indigo-600' : 'text-slate-900'}`}>
                  {surah.name}
                </span>
                {isActive && isPlaying && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="flex gap-1"
                  >
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [10, 20, 10] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                        className="w-1 bg-indigo-500 rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}
