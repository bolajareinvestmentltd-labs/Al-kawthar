'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { citadelVault } from '../../../lib/citadelData';

export default function CategoryPage() {
  const params = useParams();
  const categoryName = decodeURIComponent(params.category);
  const items = citadelVault[categoryName] || [];

  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef([]);
  const [reciter, setReciter] = useState('noreen');

  useEffect(() => {
    const savedReciter = localStorage.getItem('kawthar_reciter') || 'noreen';
    setReciter(savedReciter);
  }, []);

  const handleReciterChange = (e) => {
    const newReciter = e.target.value;
    setReciter(newReciter);
    localStorage.setItem('kawthar_reciter', newReciter);
    if (playingIndex !== null && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex].pause();
      setPlayingIndex(null);
    }
  };

  const toggleAudio = (index) => {
    const audioElement = audioRefs.current[index];
    if (playingIndex === index) {
      audioElement.pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
        audioRefs.current[playingIndex].currentTime = 0;
      }
      audioElement.play();
      setPlayingIndex(index);
      audioElement.onended = () => setPlayingIndex(null);
    }
  };

  const isRabbanaPage = categoryName === "The Rabbana Du'as";

  return (
    <main className="min-h-screen py-8 max-w-md mx-auto relative bg-brand-cream flex flex-col">
      <header className="mb-6 flex flex-col px-4 relative">
        <div className="flex items-center h-10 w-full relative">
          <Link href="/inspiration" className="absolute left-0 text-brand-terracotta hover:text-brand-dark transition p-2 z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <h1 className="font-heading text-xl font-bold text-brand-terracotta absolute w-full text-center px-12 truncate">
            {categoryName}
          </h1>
        </div>

        {isRabbanaPage && (
          <div className="mt-4 bg-white border border-brand-terracotta/20 rounded-xl px-4 py-2 flex items-center justify-between shadow-sm">
            <span className="font-sans text-xs font-bold text-gray-500 uppercase tracking-widest">Reciter</span>
            <select 
              value={reciter} 
              onChange={handleReciterChange}
              className="bg-transparent font-sans text-sm font-bold text-brand-dark focus:outline-none appearance-none cursor-pointer pr-4 text-right"
            >
              <option value="noreen">Sheikh Noreen Siddiq (Default)</option>
              <option value="mishary">Mishary Rashid Alafasy</option>
              <option value="friend">Ustadh Habeeb (Exclusive)</option>
            </select>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-5">
        {items.length === 0 ? (
          <div className="text-center mt-20 text-gray-400">
            <p className="font-sans">More invocations being added to this pillar soon.</p>
          </div>
        ) : (
          items.map((item, index) => {
            const dynamicAudioPath = item.audioPath ? item.audioPath.replace('.mp3', `-${reciter}.mp3`) : null;

            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-terracotta/10 relative overflow-hidden transition-all duration-300">
                <div className="flex justify-between items-start mb-4 border-b border-brand-cream pb-3">
                  <h3 className="font-sans font-bold text-brand-dark pr-4 flex-1">{item.title}</h3>
                  
                  {dynamicAudioPath && (
                    <button 
                      onClick={() => toggleAudio(index)}
                      className="w-10 h-10 flex-shrink-0 rounded-full bg-brand-cream text-brand-terracotta flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-colors shadow-sm"
                    >
                      <audio ref={el => audioRefs.current[index] = el} src={dynamicAudioPath} preload="none"></audio>
                      {playingIndex === index ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  )}
                </div>

                <p className="font-arabic text-3xl md:text-4xl text-brand-terracotta leading-loose mb-6 text-right" dir="rtl">{item.arabic}</p>
                <div className="mb-6 p-4 bg-brand-cream rounded-lg border border-brand-terracotta/10">
                  <p className="font-sans text-brand-dark/80 text-sm italic leading-relaxed">{item.transliteration}</p>
                </div>
                {/* FIX: Escaped quotes below to fix Next.js Error! */}
                <p className="font-sans text-[15px] text-gray-700 mb-6 leading-relaxed">&quot;{item.english}&quot;</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.reference}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
