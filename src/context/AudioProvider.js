'use client';

import { createContext, useState, useRef, useEffect, useContext } from 'react';

export const AudioContext = createContext();
export const useGlobalAudio = () => useContext(AudioContext);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, currentIndex]);

  const safePlay = () => {
    if (!audioRef.current || !audioRef.current.src) return;
    audioRef.current.play().catch(e => console.warn('Playback error:', e));
    setIsPlaying(true);
  };

  const seek = (percentage) => {
    if (!audioRef.current || !Number.isFinite(audioRef.current.duration)) return;
    const targetTime = (audioRef.current.duration * percentage) / 100;
    audioRef.current.currentTime = targetTime;
  };

  const playTrack = (track, newQueue = [], startIndex = 0) => {
    if (newQueue.length > 0) setQueue(newQueue);
    setCurrentIndex(startIndex);
    setCurrentTrack(track);
    setTimeout(safePlay, 50);
  };

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentTrack(queue[nextIndex]);
      setTimeout(safePlay, 50);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      safePlay();
    }
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      currentTrack,
      progress,
      playTrack,
      togglePlay,
      playNext,
      setQueue,
      seek
    }}>
      <audio ref={audioRef} src={currentTrack?.url || ''} preload="auto" />
      {children}
    </AudioContext.Provider>
  );
}
