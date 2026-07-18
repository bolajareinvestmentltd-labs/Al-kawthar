'use client';

import { useAudioStore } from '@/store/useAudioStore';

export const MiniPlayer = () => {
  const { isPlaying, togglePlay } = useAudioStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 bg-white/80 backdrop-blur-md border-t border-slate-200">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <span className="text-sm font-medium">Quran Recitation</span>
        <button 
          onClick={togglePlay}
          className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};
