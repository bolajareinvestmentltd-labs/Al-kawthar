'use client';

import { useState } from 'react';

export default function VerseCard({ verse, isActive, onPlayToggle, verseRef }) {
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div 
      ref={verseRef}
      id={`verse-${verse.verse_number}`}
      className={`p-6 rounded-2xl shadow-sm border mb-6 relative transition-all duration-500 ${
        isActive 
          ? 'bg-brand-terracotta/5 border-brand-terracotta ring-2 ring-brand-terracotta/20 scale-[1.02]' 
          : 'bg-white border-brand-terracotta/10'
      }`}
    >
      {/* Verse Number & Actions */}
      <div className="flex justify-between items-center mb-6 border-b border-brand-cream pb-3">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-sm transition-colors ${isActive ? 'bg-brand-terracotta text-white' : 'bg-brand-cream text-brand-terracotta'}`}>
            {verse.verse_number}
          </span>
          
          {/* Local Play Button for this specific verse */}
          <button 
            onClick={onPlayToggle}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-sans transition-colors ${isActive ? 'bg-brand-terracotta text-white' : 'bg-brand-cream text-brand-terracotta hover:bg-brand-terracotta hover:text-white'}`}
          >
            {isActive ? (
              <>
                <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                Playing
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Play Verse
              </>
            )}
          </button>
        </div>
        
        <button onClick={() => setIsBookmarked(!isBookmarked)} className={`transition-colors ${isBookmarked ? 'text-brand-terracotta' : 'text-gray-300 hover:text-brand-terracotta'}`}>
          <svg className="w-6 h-6" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </button>
      </div>

      {/* Arabic Text */}
      <p className="font-arabic text-3xl md:text-4xl text-brand-dark leading-loose text-right mb-6" dir="rtl">
        {verse.text_uthmani}
      </p>

      {/* Transliteration */}
      {showTransliteration && (
        <div className="mb-4 p-4 bg-brand-cream/50 rounded-xl border border-brand-terracotta/5">
          <p className="font-sans text-brand-dark/80 text-sm italic leading-relaxed">{verse.transliteration}</p>
        </div>
      )}

      {/* Translation */}
      {showTranslation && (
        <div className="mb-4">
          <p className="font-sans text-[15px] text-gray-700 leading-relaxed">&quot;{verse.translation}&quot;</p>
        </div>
      )}

      {/* Control Toggles */}
      <div className="flex gap-3 mt-4 pt-4 border-t border-brand-cream">
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all ${showTranslation ? 'bg-brand-terracotta text-white' : 'bg-gray-100 text-gray-500'}`}
        >
          Translation
        </button>
        <button 
          onClick={() => setShowTransliteration(!showTransliteration)}
          className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all ${showTransliteration ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500'}`}
        >
          Transliteration
        </button>
      </div>
    </div>
  );
}
