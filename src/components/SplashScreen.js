'use client';

import { useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    // Timer set to 1.2s for a snappy feel
    const timer = setTimeout(() => {
      onComplete();
    }, 1200);
    
    // THE FIX: The empty array [] ensures the ticking clock CANNOT interrupt this timer!
    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className="fixed inset-0 bg-brand-cream z-50 flex flex-col items-center justify-center animate-out fade-out duration-500 fill-mode-forwards">
      <div className="w-28 h-28 rounded-full border-4 border-brand-terracotta flex items-center justify-center mb-6 shadow-lg overflow-hidden">
        <img src="/icon-512.png" alt="Al-Kawthar Logo" className="w-full h-full object-cover" />
      </div>
      <h1 className="font-heading text-3xl font-bold text-brand-dark mb-2 tracking-wide">
        Al-Kawthar
      </h1>
      <p className="font-sans text-brand-terracotta font-medium tracking-widest text-xs uppercase">
        Peace & Guidance
      </p>
    </div>
  );
}
