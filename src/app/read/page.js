'use client';

import Link from 'next/link';
import { useState } from 'react';
import offlineSurahs from '../../data/surah-meta.json'; 

export default function ReadPage() {
  const [search, setSearch] = useState('');

  const filteredSurahs = offlineSurahs.filter(surah => 
    surah.englishName.toLowerCase().includes(search.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-brand-surface font-sans fade-in pb-32">
      
      {/* Sticky Header with Spotify-esque Blur */}
      <div className="sticky top-0 z-40 bg-brand-surface/80 backdrop-blur-lg px-4 pt-8 pb-4 border-b border-brand-primary/10">
        <div className="flex items-center mb-4 max-w-md mx-auto">
          <Link href="/" className="text-brand-primary p-2 -ml-2 hover:bg-brand-primary/10 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-brand-dark flex-1 text-center pr-8">The Noble Quran</h1>
        </div>

        <div className="relative max-w-md mx-auto">
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search Surahs (e.g., Al-Kahf)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-brand-primary/20 rounded-full py-3 pl-12 pr-4 text-sm font-bold text-brand-dark placeholder-brand-primary/40 focus:outline-none focus:border-brand-primary shadow-sm"
          />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6">
        
        {/* The Animated Reader Hero */}
        <div className="w-full bg-gradient-to-br from-brand-primary to-[#064e44] rounded-3xl p-6 mb-8 relative overflow-hidden shadow-lg flex items-center justify-between">
          <div className="z-10 text-white w-1/2">
            <h2 className="font-heading text-xl font-bold mb-1">Last Read</h2>
            <p className="text-xs text-brand-accent uppercase tracking-widest font-bold mb-4">Al-Kahf • Ayah 10</p>
            {/* The perfectly matched Link tag */}
            <Link href="/surah/18" className="inline-block bg-brand-accent text-brand-dark font-bold text-xs py-2 px-5 rounded-full hover:scale-105 transition-transform shadow-md">
              Continue
            </Link>
          </div>
          
          {/* Abstract SVG Automation of the Reader */}
          <div className="w-32 h-32 relative z-10 flex items-center justify-center">
            {/* Pulsing Aura */}
            <div className="absolute w-24 h-24 bg-brand-accent/20 rounded-full animate-pulse blur-xl"></div>
            <svg className="w-full h-full text-brand-accent" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Abstract Person */}
              <circle cx="50" cy="35" r="10" fill="currentColor" opacity="0.9" className="animate-[bounce_3s_ease-in-out_infinite]" />
              <path d="M25 80 Q 50 60 75 80 L 85 90 L 15 90 Z" fill="currentColor" opacity="0.6" />
              {/* Floating Pages / Light */}
              <path d="M40 55 Q 50 45 60 55" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_2s_ease-in-out_infinite]" />
              <circle cx="45" cy="20" r="1.5" fill="white" className="animate-[ping_2s_infinite_0.5s]" />
              <circle cx="65" cy="30" r="1" fill="white" className="animate-[ping_3s_infinite_1s]" />
            </svg>
          </div>
        </div>

        {/* Jet-Speed Offline Surah List */}
        <div className="flex flex-col gap-3">
          {filteredSurahs.map((surah) => (
            <Link 
              href={`/surah/${surah.number}`} 
              key={surah.number}
              className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-brand-primary/10 hover:border-brand-primary/40 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center font-bold text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  {surah.number}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-brand-dark">{surah.englishName}</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-brand-primary/50">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} Verses
                  </span>
                </div>
              </div>
              <span className="font-arabic text-2xl text-brand-primary">{surah.name.replace('سُورَةُ ', '')}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
