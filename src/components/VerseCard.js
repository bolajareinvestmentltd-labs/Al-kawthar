'use client'; 

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { getDeviceId } from '../lib/deviceId'; // Import our new ID generator

export default function VerseCard({ verse, verseRef, isActive, isPlaying, onPlayToggle }) {
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const englishTranslation = verse?.translations?.find(t => t.resource_id === 131)?.text || verse?.translations?.[0]?.text || "Translation not found.";
  const transliteration = verse?.translations?.find(t => t.resource_id === 57)?.text || verse?.translations?.[1]?.text || "";

  const handleBookmark = async () => {
    setIsSaving(true);
    const [chapter, verseNum] = verse?.verse_key.split(':');
    const deviceId = getDeviceId(); // Grab the user's specific phone ID!

    const { error } = await supabase
      .from('bookmarks')
      .insert([{
        user_id: deviceId, // Saved directly to their device!
        chapter_id: parseInt(chapter),
        verse_number: parseInt(verseNum)
      }]);

    if (!error) setIsBookmarked(true);
    setIsSaving(false);
  };

  return (
    <div ref={verseRef} className={`w-[96%] bg-white rounded-xl p-6 shadow-sm border transition-all duration-500 ${isActive ? 'border-brand-terracotta ring-2 ring-brand-terracotta/10 scale-[1.02]' : 'border-brand-terracotta/20 hover:shadow-md'}`}>
      <div className="flex justify-between items-center mb-6 border-b border-brand-cream pb-4 flex-wrap gap-4">
        <span className={`font-sans font-semibold tracking-wide ${isActive ? 'text-brand-terracotta text-lg' : 'text-gray-500'}`}>Verse {verse?.verse_key}</span>
        <div className="flex gap-2 flex-wrap">
          <button onClick={handleBookmark} disabled={isBookmarked || isSaving} className={`px-4 py-2 rounded-full font-sans text-xs font-medium transition-colors duration-300 ${isBookmarked ? 'bg-green-50 text-green-600 border border-green-200' : 'text-gray-600 border border-gray-200 hover:border-brand-terracotta hover:text-brand-terracotta'}`}>
            {isSaving ? 'Saving...' : isBookmarked ? '✓ Saved' : 'Bookmark'}
          </button>
          <button onClick={() => setShowTransliteration(!showTransliteration)} className="px-4 py-2 rounded-full font-sans text-xs font-medium text-brand-terracotta border border-brand-terracotta hover:bg-brand-cream transition-colors duration-300">{showTransliteration ? 'Hide Transliteration' : 'Show Transliteration'}</button>
          <button onClick={onPlayToggle} className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition-colors duration-300 ${isPlaying ? 'bg-brand-dark text-white shadow-md' : 'bg-brand-terracotta text-white hover:bg-opacity-90'}`}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
      </div>
      <p className={`font-arabic text-right text-4xl mb-8 leading-relaxed transition-colors duration-300 ${isActive ? 'text-brand-terracotta' : 'text-brand-dark'}`} dir="rtl">{verse?.text_uthmani}</p>
      {showTransliteration && transliteration && <div className="mb-6 p-4 bg-brand-cream rounded-lg border border-brand-terracotta/10"><p className="font-sans text-brand-terracotta/90 text-sm italic leading-relaxed" dangerouslySetInnerHTML={{ __html: transliteration }} /></div>}
      <p className="font-sans text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: englishTranslation }} />
    </div>
  );
}
