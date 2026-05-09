'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext'; // Import the engine connection

export default function SettingsPage() {
  const [hijriEnabled, setHijriEnabled] = useState(true);
  
  // Pull our global settings
  const { isDarkMode, toggleTheme, fontSizeMultiplier, changeFontSize } = useTheme();

  const SettingsCard = ({ icon, title, onClick, rightElement }) => (
    <div 
      onClick={onClick}
      className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-brand-terracotta/20'} border hover:border-brand-terracotta hover:shadow-sm rounded-xl p-5 flex items-center justify-between transition-all duration-300 cursor-pointer mb-4 group`}
    >
      <div className="flex items-center gap-4">
        <div className="text-brand-terracotta group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className={`font-sans font-medium text-lg ${isDarkMode ? 'text-white' : 'text-brand-dark'}`}>{title}</span>
      </div>
      <div>{rightElement}</div>
    </div>
  );

  return (
    <main className="min-h-screen py-8 px-4 max-w-md mx-auto transition-colors duration-500">
      <header className="mb-10 flex items-center relative">
        <Link href="/" className="text-brand-terracotta hover:text-brand-dark transition p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-3xl font-bold text-brand-terracotta absolute left-1/2 -translate-x-1/2">
          Settings
        </h1>
      </header>

      <div className="flex flex-col">
        
        {/* Working Theme Toggle */}
        <SettingsCard 
          title="Dark Mode" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
          onClick={toggleTheme}
          rightElement={
            <div className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 ${isDarkMode ? 'bg-brand-terracotta' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          }
        />

        {/* Working Font Size Selector */}
        <SettingsCard 
          title="App Font Size" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>}
          rightElement={
            <div className="flex gap-2">
              <button onClick={(e) => { e.stopPropagation(); changeFontSize(1); }} className={`px-3 py-1 rounded-md text-sm ${fontSizeMultiplier === 1 ? 'bg-brand-terracotta text-white' : 'bg-gray-200 text-gray-700'}`}>Aa</button>
              <button onClick={(e) => { e.stopPropagation(); changeFontSize(1.1); }} className={`px-3 py-1 rounded-md text-base ${fontSizeMultiplier === 1.1 ? 'bg-brand-terracotta text-white' : 'bg-gray-200 text-gray-700'}`}>Aa</button>
              <button onClick={(e) => { e.stopPropagation(); changeFontSize(1.2); }} className={`px-3 py-1 rounded-md text-lg ${fontSizeMultiplier === 1.2 ? 'bg-brand-terracotta text-white' : 'bg-gray-200 text-gray-700'}`}>Aa</button>
            </div>
          }
        />

        <SettingsCard 
          title="Daily Notifications" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
          onClick={() => setHijriEnabled(!hijriEnabled)}
          rightElement={
            <div className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 ${hijriEnabled ? 'bg-brand-terracotta' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${hijriEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          }
        />

      </div>
    </main>
  );
}
