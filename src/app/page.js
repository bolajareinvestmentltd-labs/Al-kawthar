'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplashScreen from '../components/SplashScreen';

export default function Dashboard() {
  const [showSplash, setShowSplash] = useState(true);
  const [liveTime, setLiveTime] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');

  useEffect(() => {
    // FIX: Check if the app has already launched during this browser session
    if (sessionStorage.getItem('hasLaunched')) {
      setShowSplash(false);
    }

    const today = new Date();
    setGregorianDate(new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(today));
    
    try {
      setHijriDate(new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(today) + ' AH');
    } catch (e) {
      setHijriDate('Hijri Calendar');
    }

    const updateTime = () => {
      setLiveTime(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).format(new Date()));
    };
    updateTime(); 
    const timer = setInterval(updateTime, 1000); 

    return () => clearInterval(timer);
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasLaunched', 'true'); // Lock the flag so it doesn't loop
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const GridCard = ({ title, href, icon }) => (
    <Link href={href} className="bg-white border border-brand-terracotta/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-brand-terracotta hover:shadow-md transition-all group">
      <div className="w-12 h-12 rounded-xl bg-brand-cream/50 flex items-center justify-center text-brand-terracotta group-hover:scale-110 group-hover:bg-brand-cream transition-all duration-300">
        {icon}
      </div>
      <span className="font-sans font-bold text-brand-dark text-[11px] uppercase tracking-wider text-center">{title}</span>
    </Link>
  );

  return (
    <main className="min-h-screen pb-6 px-4 max-w-md mx-auto fade-in duration-500 flex flex-col bg-gradient-to-b from-brand-cream to-white">
      
      {/* SECTION B: The Apex Bismillah */}
      <div className="w-full text-center pt-6 pb-4">
        <h1 className="font-arabic text-3xl text-brand-dark mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-brand-terracotta to-transparent mx-auto opacity-50"></div>
      </div>

      {/* SECTION A: Dynamic Header */}
      <header className="mb-5 flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-brand-terracotta/10">
        <div className="flex flex-col">
          {/* Digital Clock formatting */}
          <div className="flex items-center gap-1.5 mb-1 text-brand-terracotta">
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="font-mono text-2xl font-bold tracking-widest">{liveTime || "00:00:00"}</p>
          </div>
          <p className="font-sans text-gray-500 text-xs font-medium">{gregorianDate}</p>
          <p className="font-arabic text-lg font-bold text-brand-dark">{hijriDate}</p>
        </div>
        
        {/* Vector Quran Icon */}
        <div className="w-14 h-14 bg-brand-cream rounded-full flex items-center justify-center text-brand-terracotta shadow-inner">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1zm-10 14H4V6h7v12zm9 0h-7V6h7v12z"/>
            <path d="M7 8h3v2H7zm0 4h3v2H7zm10-4h-3v2h3zm0 4h-3v2h3z"/>
          </svg>
        </div>
      </header>

      {/* SECTION C: Hero Card (Compact & Asymmetrical) */}
      <div className="w-full bg-gradient-to-br from-brand-terracotta to-[#cc5f4a] rounded-3xl rounded-tr-[3rem] p-6 text-white shadow-[0_8px_20px_rgba(226,114,91,0.25)] mb-6 relative overflow-hidden">
        <div className="absolute right-[-15px] top-[-15px] opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h14v-8h3L12 2z"/></svg>
        </div>
        <h2 className="font-heading text-3xl font-bold mb-1">The Noble Quran</h2>
        <p className="font-sans text-brand-cream/90 mb-5 text-xs leading-relaxed max-w-[85%]">Illuminate your heart. Read the text or listen to continuous recitation.</p>
        <div className="flex gap-3">
          <Link href="/read" className="bg-white text-brand-terracotta px-5 py-2.5 rounded-full font-bold text-xs hover:bg-brand-cream transition shadow-sm flex-1 text-center">
            Read
          </Link>
          <Link href="/listen" className="bg-transparent border border-white/50 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-white/10 transition flex-1 text-center">
            Listen
          </Link>
        </div>
      </div>

      {/* Daily Tools Grid */}
      <h3 className="font-sans font-bold text-brand-dark text-sm mb-3 px-1">Daily Tools</h3>
      <div className="grid grid-cols-2 gap-3 mb-auto">
        <GridCard href="/inspiration" title="Citadel" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} />
        <GridCard href="/bookmarks" title="Bookmarks" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>} />
        <GridCard href="/tasbih" title="Tasbih" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <GridCard href="/settings" title="Settings" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>} />
      </div>

      {/* SECTION D: The JcLs Footer */}
      <footer className="mt-8 pt-6 pb-2 text-center border-t border-brand-terracotta/10">
        <p className="font-sans text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
          Forged with love and self-discovery <br/> in the worship of Allah by
        </p>
        <a href="#" className="font-heading font-bold text-brand-terracotta text-sm hover:text-brand-dark transition-colors mt-1 inline-block">
          JcLs (Jare's Choice Labs)
        </a>
      </footer>

    </main>
  );
}
