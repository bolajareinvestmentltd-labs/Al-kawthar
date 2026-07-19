'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [countdown, setCountdown] = useState('03:09:56');
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCountdown(`03:09:${(59 - (now.getSeconds() % 60)).toString().padStart(2, '0')}`);
      setToday(now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const longDate = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const hijriDate = today.toLocaleDateString('ar-SA-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-brand-surface flex flex-col font-sans fade-in pb-24">
      
      {/* 1. The Mosque Hero Section */}
      <div className="bg-gradient-to-b from-brand-primary to-[#064e44] text-white pt-10 pb-20 px-6 rounded-b-[40px] relative overflow-hidden shadow-lg">
        {/* Soft Ambient Light Mock */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-brand-accent/10 rounded-t-full blur-3xl"></div>

        <div className="flex justify-between items-start relative z-10">
          <Link href="/settings" className="p-2 hover:bg-white/10 rounded-full transition">
            <svg className="w-6 h-6 text-brand-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </Link>
          <div className="text-right">
             <h2 className="text-2xl font-arabic font-bold">محمد</h2>
             <p className="text-xs text-brand-surface/70 tracking-widest mt-1">ﷺ</p>
          </div>
        </div>

        {/* The Live Prayer Countdown */}
        <div className="mt-6 flex flex-col items-center relative z-10">
          <div className="w-full max-w-sm rounded-[40px] border-4 border-brand-surface/20 bg-brand-primary p-6 shadow-inner sm:p-8">
            <div className="absolute inset-0 rounded-[40px] border border-brand-accent/30 opacity-60"></div>
            <div className="relative flex flex-col items-center gap-3">
              <span className="text-sm text-brand-surface mb-1 font-arabic font-bold">صلاة الظهر بعد</span>
              <span className="text-3xl font-bold font-sans tracking-widest text-brand-accent drop-shadow-md">{countdown}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-2 rounded-xl bg-black/20 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-brand-surface/90 backdrop-blur-sm sm:grid-cols-3">
           <span>{weekday}</span>
           <span>{longDate}</span>
           <span className="font-arabic font-normal tracking-normal text-sm">{hijriDate}</span>
        </div>
      </div>

      {/* 2. The 3-Column Tool Grid */}
      <div className="flex-1 px-4 -mt-8 relative z-20">
         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <GridItem href="/read" title="القرآن الكريم" subtitle="Al-Quran" />
            <GridItem href="/inspiration" title="أذكار المسلم" subtitle="Daily Adhkar" />
            <GridItem href="/tasbih" title="التسبيح" subtitle="Tasbih" />
            
            <GridItem href="/listen" title="استماع" subtitle="Listen" />
            <GridItem href="#" title="اتجاه القبلة" subtitle="Qibla" />
            <GridItem href="#" title="أوقات الصلاة" subtitle="Prayer Times" />
         </div>
      </div>
    </main>
  );
}

// Reusable Icon Card Component
function GridItem({ href, title, subtitle }) {
  return (
    <Link href={href} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-brand-primary/10 hover:border-brand-primary hover:shadow-md transition-all group">
      <div className="w-12 h-12 bg-brand-surface rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative">
        <div className="absolute w-8 h-8 bg-brand-primary/10 rounded-full animate-pulse"></div>
        {/* Placeholder SVG Icon */}
        <svg className="w-6 h-6 text-brand-primary relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      </div>
      <span className="font-arabic font-bold text-[13px] text-brand-dark text-center leading-tight mb-1">{title}</span>
      <span className="font-sans text-[9px] uppercase tracking-wider text-gray-400 text-center">{subtitle}</span>
    </Link>
  );
}
