'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Added for navigating chapters
import VerseCard from './VerseCard';

export default function SurahReader({ verses, chapterId }) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  const verseRefs = useRef({}); 
  const router = useRouter(); // Initialize the router

  const currentVerse = currentIndex >= 0 ? verses[currentIndex] : null;
  const audioUrl = currentVerse?.audio?.url ? currentVerse.audio.url : currentVerse?.audio || null;

  useEffect(() => {
    if (currentIndex >= 0 && verseRefs.current[currentIndex]) {
      verseRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center', 
      });
    }
  }, [currentIndex]);

  const handleVerseEnd = () => {
    if (currentIndex < verses.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // THE UPGRADE: Auto-play the next Surah!
      const nextSurah = parseInt(chapterId) + 1;
      if (nextSurah <= 114) {
        router.push(`/surah/${nextSurah}`);
      } else {
        setIsPlaying(false);
        setCurrentIndex(-1); 
      }
    }
  };

  const toggleMasterPlay = () => {
    if (currentIndex === -1) {
      setCurrentIndex(0); 
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const playSpecificVerse = (index) => {
    if (currentIndex === index) {
      setIsPlaying(!isPlaying); 
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && audioUrl) {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioUrl]);

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="sticky top-4 z-50 bg-brand-cream/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-brand-terracotta/20 flex items-center justify-between w-[96%] max-w-md">
        <span className="font-sans font-bold text-brand-dark text-sm truncate pr-4">
          {currentIndex >= 0 ? `Playing Verse ${verses[currentIndex].verse_number}` : 'Ready to Listen'}
        </span>
        <button 
          onClick={toggleMasterPlay}
          className="bg-brand-terracotta text-white px-6 py-2 rounded-full font-sans text-sm font-medium hover:bg-brand-dark transition-colors shadow-md whitespace-nowrap"
        >
          {isPlaying ? 'Pause Surah' : 'Play Surah'}
        </button>
      </div>

      <audio 
        ref={audioRef} 
        src={audioUrl || undefined} 
        onEnded={handleVerseEnd} 
        autoPlay={isPlaying} 
      />

      {verses.map((verse, index) => (
        <VerseCard 
          key={verse.id} 
          verse={verse} 
          verseRef={(el) => (verseRefs.current[index] = el)}
          isActive={currentIndex === index}
          isPlaying={currentIndex === index && isPlaying}
          onPlayToggle={() => playSpecificVerse(index)}
        />
      ))}
    </div>
  );
}
