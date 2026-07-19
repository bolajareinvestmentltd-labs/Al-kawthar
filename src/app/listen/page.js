'use client';

import Link from 'next/link';
import { useGlobalAudio } from '../../context/AudioProvider';

const safeBars = [1, 2, 3, 4, 5];

const listenVault = [
  { id: 1, title: 'Surah Al-Fatiha', subtitle: 'Mishary Rashid Alafasy', url: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3' },
  { id: 2, title: 'Ayatul Kursi', subtitle: 'Sheikh Noreen Siddiq', url: 'https://everyayah.com/data/Noreen_Siddiq_128kbps/002255.mp3' }, 
  { id: 3, title: 'Rabbana 1', subtitle: 'Ustaz Abdulrasheed Aromokala', url: 'https://everyayah.com/data/Alafasy_128kbps/002201.mp3' } 
];

export default function ListenPage() {
  const { isPlaying, currentTrack, playTrack } = useGlobalAudio();

  const handleTrackClick = (track) => {
    playTrack(track);
  };

  return (
    <main className="min-h-screen py-8 px-4 max-w-md mx-auto relative bg-brand-surface flex flex-col fade-in pb-32">
      
      <header className="mb-8 flex items-center w-full relative h-10">
        <Link href="/" className="absolute left-0 text-brand-primary hover:text-brand-primary/80 transition p-2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-primary absolute w-full text-center">
          Listen
        </h1>
      </header>

      <div className="w-full bg-brand-primary rounded-3xl p-8 flex flex-col items-center justify-center shadow-xl mb-8 relative overflow-hidden group">
        <div className={`absolute inset-0 bg-brand-accent/20 blur-3xl transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-30'}`}></div>

        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <div className={`absolute inset-0 rounded-full border-2 border-brand-accent/30 transition-transform duration-1000 ${isPlaying ? 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]' : 'scale-100'}`}></div>
          <div className="absolute inset-2 rounded-full border border-brand-accent/50"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-brand-accent to-[#d9924c] rounded-full flex items-center justify-center shadow-lg z-10">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
          </div>
        </div>

        <h2 className="font-sans font-bold text-white text-xl mb-1 text-center truncate w-full">
          {currentTrack ? currentTrack.title : 'Select a Track'}
        </h2>
        <p className="font-sans text-brand-accent text-xs uppercase tracking-widest text-center truncate w-full">
          {currentTrack ? currentTrack.subtitle : 'Spiritual Ecosystem'}
        </p>

        <div className="flex gap-1.5 mt-6 h-6 items-end">
          {safeBars.map((bar) => (
            <div 
              key={bar} 
              className={`w-1.5 bg-white rounded-t-sm transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`}
              style={{ 
                height: isPlaying ? `${Math.max(20, 70)}%` : '4px',
                animationDelay: `${bar * 0.15}s` 
              }}
            ></div>
          ))}
        </div>
      </div>

      <h3 className="font-sans font-bold text-brand-primary/60 text-xs mb-4 uppercase tracking-widest px-2">
        Featured Recitations
      </h3>

      <div className="flex flex-col gap-3 pb-8">
        {listenVault.map((track) => {
          const isThisTrackPlaying = currentTrack?.url === track.url;

          return (
            <div 
              key={track.id} 
              onClick={() => handleTrackClick(track)}
              className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 shadow-sm border ${
                isThisTrackPlaying 
                  ? 'bg-brand-primary text-white border-brand-primary shadow-md scale-[1.02]' 
                  : 'bg-white text-brand-dark border-brand-primary/10 hover:border-brand-primary/40'
              }`}
            >
              <div className="flex flex-col overflow-hidden pr-4">
                <span className="font-sans font-bold text-sm truncate">{track.title}</span>
                <span className={`font-sans text-[10px] uppercase tracking-widest mt-1 ${isThisTrackPlaying ? 'text-brand-surface/80' : 'text-gray-400'}`}>
                  {track.subtitle}
                </span>
              </div>

              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isThisTrackPlaying ? 'bg-brand-surface text-brand-primary' : 'bg-brand-surface text-brand-primary'
              }`}>
                {isThisTrackPlaying && isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
