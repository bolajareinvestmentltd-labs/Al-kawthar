'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import hadithData from '../../data/hadith.json';

export default function InspirationPage() {
  const [dailyHadith, setDailyHadith] = useState(null);

  useEffect(() => {
    // 1. Get today's exact date string (e.g., "Fri May 22 2026")
    const today = new Date().toDateString();
    
    // 2. The "Midnight Hash" Algorithm
    // Converts the date string into a unique number
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // 3. Pick a random Hadith based on today's hash
    const index = Math.abs(hash) % hadithData.length;
    setDailyHadith(hadithData[index]);
  }, []);

  return (
    <main className="min-h-screen bg-brand-surface flex flex-col items-center py-8 px-4 font-sans fade-in pb-24 relative">
      
      {/* Header */}
      <header className="w-full flex items-center justify-between mb-8 max-w-md relative z-10">
        <Link href="/" className="text-brand-primary p-2 hover:bg-brand-primary/10 rounded-full transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-primary">Daily Inspiration</h1>
        <div className="w-10"></div>
      </header>

      <div className="max-w-md w-full flex flex-col gap-6 relative z-10">
        
        {/* The Offline Daily Hadith Card */}
        <div className="bg-white rounded-3xl p-8 shadow-md border-ornate flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-full pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
               <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </div>
            <h2 className="font-bold text-brand-primary uppercase tracking-widest text-xs">Hadith of the Day</h2>
          </div>

          {dailyHadith ? (
            <div className="flex flex-col gap-6 fade-in">
              <p className="font-arabic text-3xl text-right leading-loose text-brand-dark drop-shadow-sm">
                {dailyHadith.text_ar}
              </p>
              <div className="w-12 h-[1px] bg-brand-accent/50 rounded-full mx-auto"></div>
              <p className="font-sans text-brand-dark/80 text-center leading-relaxed">
                "{dailyHadith.text_en}"
              </p>
              <p className="font-sans font-bold text-brand-accent text-xs uppercase tracking-widest text-center mt-2">
                {dailyHadith.source}
              </p>
            </div>
          ) : (
             <div className="animate-pulse flex flex-col gap-4">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-20 bg-gray-200 rounded w-full"></div>
             </div>
          )}
        </div>

        {/* 40 Rabbanas Placeholder (To be wired offline next) */}
        <div className="bg-brand-primary text-white rounded-3xl p-6 shadow-lg flex items-center justify-between mt-4">
           <div>
             <h3 className="font-bold text-lg mb-1">40 Rabbanas</h3>
             <p className="text-xs text-brand-surface/70 uppercase tracking-widest">Quranic Supplications</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
           </div>
        </div>

      </div>
    </main>
  );
}
