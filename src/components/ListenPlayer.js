'use client';

import { useState, useRef, useEffect } from 'react';

export default function ListenPlayer({ chapters, audioData }) {
  const [currentSurahId, setCurrentSurahId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Progress Bar States
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Sleep Timer States
  const [sleepTimerValue, setSleepTimerValue] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  
  const audioRef = useRef(null);

  const currentChapter = chapters.find(c => c.id === currentSurahId);
  const currentAudio = audioData.find(a => a.chapter_id === currentSurahId);

  // Sleep Timer Countdown Logic
  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && sleepTimerValue > 0) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      setSleepTimerValue(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, sleepTimerValue]);

  const handleSetTimer = (minutes) => {
    setSleepTimerValue(minutes);
    setTimeLeft(minutes * 60);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const jumpToSurah = (e) => {
    setCurrentSurahId(Number(e.target.value));
    setIsPlaying(true); // Auto-play when they select a new Surah
  };

  const nextSurah = () => {
    if (currentSurahId < 114) {
      setCurrentSurahId(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const prevSurah = () => {
    if (currentSurahId > 1) {
      setCurrentSurahId(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  // Audio Progress Tracking
  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (totalSeconds) => {
    if (isNaN(totalSeconds)) return "0:00";
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full bg-white rounded-3xl p-8 shadow-lg border border-brand-terracotta/20 flex flex-col items-center relative overflow-hidden">
      
      <audio 
        ref={audioRef}
        src={currentAudio?.audio_url || undefined}
        onEnded={nextSurah}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay={isPlaying}
      />

      {sleepTimerValue > 0 && (
        <div className="absolute top-0 left-0 w-full bg-brand-terracotta/10 py-2 flex justify-center items-center gap-2 text-brand-terracotta font-sans text-sm font-bold">
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Sleep Timer: {formatTime(timeLeft)}
        </div>
      )}

      {/* NEW: Surah Selector Dropdown */}
      <div className="w-full mt-4 mb-2">
        <select 
          value={currentSurahId} 
          onChange={jumpToSurah}
          className="w-full p-3 rounded-xl bg-brand-cream border border-brand-terracotta/30 text-brand-dark font-sans font-medium focus:outline-none focus:border-brand-terracotta appearance-none text-center"
        >
          {chapters.map(c => (
            <option key={c.id} value={c.id}>
              {c.id}. {c.name_simple}
            </option>
          ))}
        </select>
      </div>

      <div className={`mt-4 mb-8 text-center transition-all duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
        <p className="font-arabic text-4xl text-brand-terracotta mb-2">{currentChapter?.name_arabic}</p>
        <p className="font-sans text-gray-500 text-sm">Mishary Rashid Alafasy</p>
      </div>

      {/* NEW: Live Progress Bar */}
      <div className="w-full mb-8 flex flex-col gap-2">
        <input 
          type="range" 
          min="0" 
          max={duration || 100} 
          value={currentTime} 
          onChange={handleSeek}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-terracotta"
        />
        <div className="flex justify-between text-xs text-gray-400 font-sans font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-10">
        <button onClick={prevSurah} disabled={currentSurahId === 1} className="text-gray-400 hover:text-brand-terracotta transition disabled:opacity-30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-brand-terracotta text-white flex items-center justify-center shadow-[0_8px_16px_rgba(226,114,91,0.3)] hover:scale-105 transition-transform">
          {isPlaying ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
          ) : (
            <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>

        <button onClick={nextSurah} disabled={currentSurahId === 114} className="text-gray-400 hover:text-brand-terracotta transition disabled:opacity-30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="w-full border-t border-gray-100 pt-6">
        <p className="text-center text-sm text-gray-500 font-sans mb-4">Set Sleep Timer</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <button onClick={() => handleSetTimer(0)} className={`px-4 py-2 rounded-full text-xs font-bold transition ${sleepTimerValue === 0 ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600'}`}>Off</button>
          <button onClick={() => handleSetTimer(15)} className={`px-4 py-2 rounded-full text-xs font-bold transition ${sleepTimerValue === 15 ? 'bg-brand-terracotta text-white' : 'bg-brand-cream border border-brand-terracotta/30 text-brand-terracotta'}`}>15 min</button>
          <button onClick={() => handleSetTimer(30)} className={`px-4 py-2 rounded-full text-xs font-bold transition ${sleepTimerValue === 30 ? 'bg-brand-terracotta text-white' : 'bg-brand-cream border border-brand-terracotta/30 text-brand-terracotta'}`}>30 min</button>
          <button onClick={() => handleSetTimer(60)} className={`px-4 py-2 rounded-full text-xs font-bold transition ${sleepTimerValue === 60 ? 'bg-brand-terracotta text-white' : 'bg-brand-cream border border-brand-terracotta/30 text-brand-terracotta'}`}>1 hr</button>
        </div>
      </div>

    </div>
  );
}
