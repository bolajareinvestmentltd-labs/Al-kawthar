'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { getFullSurah } from '../../../lib/api';
import { useGlobalAudio } from '../../../context/AudioProvider';

export default function SurahPage({ params }) {
  const unwrappedParams = use(params);
  const surahId = unwrappedParams.id;

  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isPlaying, currentTrack, playTrack } = useGlobalAudio();

  useEffect(() => {
    async function loadSurah() {
      const data = await getFullSurah(surahId);
      setSurah(data);
      setLoading(false);
    }
    loadSurah();
  }, [surahId]);

  if (loading) return (
    <div className="min-h-screen bg-brand-surface flex flex-col items-center justify-center fade-in">
      <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-brand-primary uppercase tracking-widest text-xs">Opening Citadel Vault...</p>
    </div>
  );

  if (!surah) return <div className="text-center mt-20 text-brand-primary font-bold">Failed to load Surah.</div>;

  return (
    <main className="min-h-screen bg-brand-surface font-sans pb-40">
      <div className="sticky top-0 z-40 bg-gradient-to-b from-brand-primary to-brand-primary/95 shadow-md px-4 pt-8 pb-6 text-white rounded-b-3xl">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link href="/read" className="p-2 hover:bg-white/10 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold">{surah.name}</h1>
            <p className="text-[10px] text-brand-accent uppercase tracking-widest mt-1">{surah.translationName} • {surah.totalVerses} Verses</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6 flex flex-col gap-6">
        {surah.verses.map((verse) => {
          // MATHEMATICAL AUDIO GENERATOR
          // Converts Surah 1, Ayah 1 into "001001.mp3"
          const surahPad = String(surah.number).padStart(3, '0');
          const ayahPad = String(verse.verse_number).padStart(3, '0');
          const generatedAudioUrl = `https://everyayah.com/data/Alafasy_128kbps/${surahPad}${ayahPad}.mp3`;

          const trackData = {
             url: generatedAudioUrl,
             title: `Ayah ${verse.verse_number}`,
             subtitle: surah.name
          };
          const isThisTrackPlaying = currentTrack?.url === generatedAudioUrl;

          return (
            <div key={verse.id} className="bg-white rounded-3xl p-6 shadow-sm border-ornate relative group">
              <div className="flex justify-between items-center mb-6 border-b border-brand-primary/10 pb-4">
                <span className="w-8 h-8 rounded-full bg-brand-surface text-brand-primary flex items-center justify-center font-bold text-sm shadow-inner">
                  {verse.verse_number}
                </span>
                
                <button 
                  onClick={() => playTrack(trackData)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                    isThisTrackPlaying && isPlaying 
                    ? 'bg-brand-accent text-brand-dark scale-95' 
                    : 'bg-brand-primary text-white hover:bg-brand-primary/90'
                  }`}
                >
                  {isThisTrackPlaying && isPlaying ? (
                    <><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> PAUSE</>
                  ) : (
                    <><svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> PLAY</>
                  )}
                </button>
              </div>

              <p className="font-arabic text-3xl text-right leading-[2.5] text-brand-dark mb-6">
                {verse.text_uthmani}
              </p>
              
              <div className="bg-brand-surface/50 p-4 rounded-xl border border-brand-primary/5">
                <p className="font-sans text-sm text-brand-dark/80 leading-relaxed">
                  {verse.translation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
