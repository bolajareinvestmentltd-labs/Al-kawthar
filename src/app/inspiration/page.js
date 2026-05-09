'use client';

import { useState } from 'react';
import Link from 'next/link';
import { citadelVault } from '../../lib/citadelData';

export default function CitadelPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const pillars = [
    'Daily Adhkar', 'Emotions & Hardships', 'Everyday Routines', 
    'Travel & Protection', 'The Rabbana Du\'as', 'Prophetic Wisdom'
  ];

  // The Search Engine Logic: Flatten the vault and filter based on input
  const allDuas = Object.entries(citadelVault).flatMap(([category, items]) => 
    items.map(item => ({ ...item, category }))
  );
  
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allDuas.filter(dua => 
        dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.arabic.includes(searchQuery)
      );

  return (
    <main className="min-h-screen pb-12 max-w-md mx-auto relative bg-brand-cream flex flex-col">
      <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-md pt-8 pb-4 px-4 border-b border-brand-terracotta/20">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-brand-terracotta hover:text-brand-dark transition p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-brand-terracotta">Citadel of Believers</h1>
          <div className="w-8"></div>
        </div>
        <div className="relative">
          {/* Wire up the Search Bar to React State */}
          <input 
            type="text" 
            placeholder="Search for a Du'a or emotion..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-brand-terracotta/30 rounded-xl py-3 pl-10 pr-4 font-sans text-brand-dark focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta shadow-sm transition-all" 
          />
          <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </header>

      <div className="px-4 mt-6 space-y-8">
        
        {/* Dynamic View: Show Search Results OR the Pillars */}
        {searchQuery.length > 0 ? (
          <section className="fade-in">
            <h2 className="font-sans font-bold text-brand-dark text-sm mb-4 px-1 uppercase tracking-wider text-gray-500">Search Results</h2>
            {searchResults.length === 0 ? (
              <div className="text-center mt-10">
                <p className="font-sans text-gray-400">No invocations found for "{searchQuery}".</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {searchResults.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-terracotta/10 relative overflow-hidden group hover:border-brand-terracotta transition-all duration-300">
                    <span className="inline-block bg-brand-cream text-brand-terracotta text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold mb-3">{item.category}</span>
                    <h3 className="font-sans font-bold text-brand-dark mb-4 border-b border-brand-cream pb-2">{item.title}</h3>
                    <p className="font-arabic text-3xl text-brand-terracotta leading-relaxed mb-6 text-right" dir="rtl">{item.arabic}</p>
                    <p className="font-sans text-[15px] text-gray-700 mb-6 leading-relaxed">"{item.english}"</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="fade-in">
              <h2 className="font-sans font-bold text-brand-dark text-lg mb-4 px-1">Library Pillars</h2>
              <div className="grid grid-cols-2 gap-3">
                {pillars.map(pillar => (
                  <Link key={pillar} href={`/inspiration/${encodeURIComponent(pillar)}`} className="bg-white p-4 rounded-xl border border-brand-terracotta/10 hover:border-brand-terracotta hover:shadow-md flex flex-col items-center text-center gap-3 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center text-brand-terracotta group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <span className="font-sans font-bold text-sm text-brand-dark leading-tight">{pillar}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="fade-in">
              <h2 className="font-sans font-bold text-brand-dark text-lg mb-4 px-1 flex items-center gap-2">
                Learning Hub <span className="bg-brand-terracotta/10 text-brand-terracotta text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">Coming Soon</span>
              </h2>
              <div className="bg-brand-dark text-white p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <span className="font-arabic text-9xl">ع</span>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">Master the Arabic</h3>
                <p className="font-sans text-sm text-gray-300 mb-6 w-4/5 leading-relaxed">Interactive lessons to perfect your pronunciation and vocabulary.</p>
                <button className="bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-xl font-sans text-sm font-bold backdrop-blur-sm cursor-not-allowed flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Locked Module
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
