'use client';

import { useGlobalAudio } from '../context/AudioProvider';
import Link from 'next/link';

export default function MiniPlayer() {
  const { isPlaying, currentTrack, progress, togglePlay, seek } = useGlobalAudio();

  if (!currentTrack) return null;

  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    seek(percentage);
  };

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 right-0 max-w-md mx-auto bg-brand-dark text-white shadow-[0_-15px_40px_rgba(0,0,0,0.4)] z-[999] fade-in rounded-t-3xl md:rounded-3xl overflow-hidden border-t-2 border-brand-accent/50 pb-6 pt-1 md:pb-1">
      
      {/* The Spotify-Style Scrubber Bar */}
      <div 
        className="h-1.5 w-full bg-gray-800 cursor-pointer group relative"
        onClick={handleScrub}
      >
        <div 
          className="absolute top-0 left-0 h-full bg-brand-accent transition-all duration-100 relative"
          style={{ width: `${progress}%` }}
        >
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-active:opacity-100 transition-opacity transform translate-x-1/2"></div>
        </div>
      </div>

      <div className="px-5 py-3 flex items-center justify-between">
        
        {/* Track Info */}
        <Link href="/listen" className="flex items-center gap-3 flex-1 overflow-hidden">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center flex-shrink-0 shadow-md">
            {isPlaying ? (
               <div className="flex gap-0.5 items-end h-4">
                 <div className="w-1 bg-white animate-[bounce_1s_infinite] h-full"></div>
                 <div className="w-1 bg-white animate-[bounce_1s_infinite_0.2s] h-1/2"></div>
                 <div className="w-1 bg-white animate-[bounce_1s_infinite_0.4s] h-3/4"></div>
               </div>
            ) : (
               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            )}
          </div>
          <div className="flex flex-col overflow-hidden pr-2">
            <span className="font-sans font-bold text-sm truncate text-white">{currentTrack.title}</span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-brand-surface/70 truncate">{currentTrack.subtitle}</span>
          </div>
        </Link>

        {/* Media Controls */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-brand-dark hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
