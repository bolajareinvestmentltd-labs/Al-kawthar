'use client';

import Link from 'next/link';
import { useGlobalAudio } from '../../../context/AudioProvider';

// Dummy vault for testing auto-flow. We will replace with the full 40 URLs later.
const rabbanaVault = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Rabbana ${i + 1}`,
  subtitle: 'Quranic Supplication',
  // Using 3 short real audio files to test the playlist flow, the rest are placeholders
  url: i === 0 ? 'https://everyayah.com/data/Alafasy_128kbps/002201.mp3' :
       i === 1 ? 'https://everyayah.com/data/Alafasy_128kbps/002250.mp3' :
       i === 2 ? 'https://everyayah.com/data/Alafasy_128kbps/002286.mp3' : 
       `https://dummy-link-for-rabbana-${i+1}.mp3`
}));

export default function RabbanaPlaylist() {
  const { isPlaying, currentTrack, playTrack, togglePlay, playNext, playPrev } = useGlobalAudio();

  const handlePlayAll = () => {
    // Passes the entire vault to the queue, starting at index 0
    playTrack(rabbanaVault[0], rabbanaVault, 0);
  };

  return (
    <main className="min-h-screen bg-brand-surface font-sans fade-in pb-32">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-brand-surface/90 backdrop-blur-md px-4 pt-8 pb-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link href="/listen" className="p-2 -ml-2 text-brand-primary hover:bg-brand-primary/10 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <h1 className="font-heading text-xl font-bold text-brand-dark">40 Rabbanas</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-4 flex flex-col gap-6">
        
        {/* The Playlist Control Hero */}
        <div className="w-full bg-gradient-to-br from-brand-primary to-[#064e44] rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
           
           <h2 className="font-heading text-3xl font-bold mb-2 drop-shadow-md">The 40 Rabbanas</h2>
           <p className="text-xs text-brand-accent uppercase tracking-widest font-bold mb-8">Continuous Recitation</p>
           
           {/* Big Media Controls */}
           <div className="flex items-center justify-center gap-8">
              <button onClick={playPrev} className="text-white/70 hover:text-white hover:scale-110 transition">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              
              <button 
                onClick={handlePlayAll}
                className="w-16 h-16 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
              >
                {isPlaying && currentTrack?.title.includes("Rabbana") ? (
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                   <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              
              <button onClick={playNext} className="text-white/70 hover:text-white hover:scale-110 transition">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
           </div>
        </div>

        {/* The Track List */}
        <div className="flex flex-col gap-2">
          {rabbanaVault.map((track, index) => {
            const isThisTrackPlaying = currentTrack?.id === track.id;

            return (
              <div 
                key={track.id}
                onClick={() => playTrack(track, rabbanaVault, index)}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition border ${
                  isThisTrackPlaying 
                    ? 'bg-brand-primary text-white border-brand-primary shadow-md' 
                    : 'bg-white text-brand-dark border-brand-primary/10 hover:border-brand-primary/30'
                }`}
              >
                <div className="flex items-center gap-4">
                   <span className={`font-bold w-6 ${isThisTrackPlaying ? 'text-brand-accent' : 'text-brand-primary/40'}`}>
                     {track.id < 10 ? `0${track.id}` : track.id}
                   </span>
                   <div className="flex flex-col">
                      <span className="font-bold text-sm">{track.title}</span>
                      <span className={`text-[10px] uppercase tracking-widest mt-0.5 ${isThisTrackPlaying ? 'text-white/70' : 'text-gray-400'}`}>
                        {track.subtitle}
                      </span>
                   </div>
                </div>
                
                {isThisTrackPlaying && isPlaying && (
                  <div className="flex gap-0.5 items-end h-3 mr-2">
                    <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite] h-full"></div>
                    <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite_0.2s] h-1/2"></div>
                    <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite_0.4s] h-3/4"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
