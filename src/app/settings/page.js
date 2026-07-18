'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [interval, setNotificationInterval] = useState('off');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedInterval = localStorage.getItem('kawthar_notif_interval') || 'off';
    setNotificationInterval(savedInterval);
  }, []);

  const handleIntervalChange = (newInterval) => {
    setNotificationInterval(newInterval);
    localStorage.setItem('kawthar_notif_interval', newInterval);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const SettingsSection = ({ title, icon, children }) => (
    <section className="bg-white p-5 rounded-2xl shadow-sm border border-brand-terracotta/10 mb-4">
      <div className="flex items-center gap-3 mb-4 border-b border-brand-cream pb-3">
        <div className="w-8 h-8 bg-brand-cream rounded-full flex items-center justify-center text-brand-terracotta">
          {icon}
        </div>
        <h2 className="font-sans font-bold text-brand-dark">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <main className="min-h-screen py-8 px-4 max-w-md mx-auto relative bg-brand-cream flex flex-col">
      <header className="mb-6 flex items-center w-full relative h-10">
        <Link href="/" className="absolute left-0 text-brand-terracotta hover:text-brand-dark transition p-2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-terracotta absolute w-full text-center">Settings</h1>
      </header>

      {/* CARD 1: The Glance Reward (Notifications) */}
      <SettingsSection 
        title="The Glance Reward" 
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
      >
        <p className="font-sans text-xs text-gray-500 mb-4 leading-relaxed">Receive automated lock-screen notifications containing Adhkar.</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'off', label: 'Off' }, { id: '5m', label: '5 Mins' }, { id: '1h', label: '1 Hour' },
            { id: '2h', label: '2 Hours' }, { id: '6h', label: '6 Hours' }, { id: '24h', label: 'Daily' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => handleIntervalChange(option.id)}
              className={`py-2 px-1 rounded-lg font-sans text-xs font-bold transition-all border ${
                interval === option.id
                  ? 'bg-brand-terracotta text-white border-brand-terracotta shadow-sm'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-brand-terracotta/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className={`text-right text-green-500 font-bold text-xs mt-2 transition-opacity ${isSaved ? 'opacity-100' : 'opacity-0'}`}>Saved! ✓</div>
      </SettingsSection>

      {/* CARD 2: Display & Reading */}
      <SettingsSection 
        title="Display & Reading" 
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>}
      >
        <div className="flex justify-between items-center py-2">
          <span className="font-sans text-sm text-brand-dark font-medium">Arabic Font Size</span>
          <div className="flex gap-2 bg-brand-cream p-1 rounded-lg">
            <button className="px-3 py-1 font-sans text-sm font-bold text-gray-500 hover:text-brand-terracotta">A-</button>
            <button className="px-3 py-1 font-sans text-lg font-bold text-brand-dark">A</button>
            <button className="px-3 py-1 font-sans text-xl font-bold text-gray-500 hover:text-brand-terracotta">A+</button>
          </div>
        </div>
      </SettingsSection>

      {/* CARD 3: Audio Preferences */}
      <SettingsSection 
        title="Audio Preferences" 
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>}
      >
        <div className="flex justify-between items-center py-2">
          <span className="font-sans text-sm text-brand-dark font-medium">Background Play</span>
          <div className="w-10 h-5 bg-brand-terracotta rounded-full relative shadow-inner">
            <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
          </div>
        </div>
      </SettingsSection>

      <div className="mt-auto pt-6 text-center">
        <img src="/icon-192.png" alt="Al-Kawthar" className="w-12 h-12 mx-auto mb-2 opacity-50 grayscale" />
        <p className="font-heading font-bold text-gray-400 text-sm">Al-Kawthar</p>
        <p className="font-sans text-[10px] text-brand-terracotta/60 uppercase tracking-[0.2em] mt-2">By JcLs (Jare's Choice Labs)</p>
      </div>
    </main>
  );
}
