'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultLogs = [
  { id: '1', title: 'Subhanallah', count: 0, target: 33 },
  { id: '2', title: 'Alhamdulillah', count: 0, target: 33 },
  { id: '3', title: 'Allahu Akbar', count: 0, target: 33 },
  { id: '4', title: 'Istighfar', count: 0, target: 100 },
];

export default function TasbihPage() {
  const [logs, setLogs] = useState([]);
  const [activeLogId, setActiveLogId] = useState('1');
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load the Spiritual Ledger and PATCH old data
  useEffect(() => {
    const savedLogs = localStorage.getItem('kawthar_tasbih_logs');
    if (savedLogs) {
      // Data Migration: Ensure old memory gets the new 'target' property
      const parsedLogs = JSON.parse(savedLogs).map(log => ({
        ...log,
        target: log.target || 33 
      }));
      setLogs(parsedLogs);
    } else {
      setLogs(defaultLogs);
    }
    setIsLoaded(true);
  }, []);

  // 2. Save to memory whenever logs change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kawthar_tasbih_logs', JSON.stringify(logs));
    }
  }, [logs, isLoaded]);

  if (!isLoaded) return null;

  const activeLog = logs.find(log => log.id === activeLogId) || logs[0];
  const safeTarget = activeLog.target || 33; // Fallback math protection

  const handleTap = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      if ((activeLog.count + 1) % safeTarget === 0) {
        window.navigator.vibrate([50, 50, 50]); 
      } else {
        window.navigator.vibrate(10);
      }
    }

    setLogs(logs.map(log => 
      log.id === activeLogId ? { ...log, count: log.count + 1 } : log
    ));
  };

  const handleReset = () => {
    if (confirm(`Are you sure you want to reset your count for ${activeLog.title}?`)) {
      setLogs(logs.map(log => 
        log.id === activeLogId ? { ...log, count: 0 } : log
      ));
    }
  };

  // Safe SVG Ring Math
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const currentLapProgress = activeLog.count % safeTarget;
  const fillPercentage = activeLog.count === 0 ? 0 : 
    (currentLapProgress === 0 ? 100 : (currentLapProgress / safeTarget) * 100);
  const strokeDashoffset = circumference - (fillPercentage / 100) * circumference;

  return (
    <main className="min-h-screen bg-brand-surface flex flex-col items-center py-8 px-4 font-sans fade-in pb-32">
      
      {/* Header */}
      <header className="w-full flex items-center justify-between mb-8 max-w-md">
        <Link href="/" className="text-brand-primary p-2 hover:bg-brand-primary/10 rounded-full transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-primary">التسبيح</h1>
        <div className="w-10"></div>
      </header>

      <div className="max-w-md w-full flex flex-col items-center flex-1">
        
        {/* The Ledger Selector */}
        <div className="w-full bg-white p-2 rounded-2xl shadow-sm border border-brand-primary/10 mb-12 flex overflow-x-auto hide-scrollbar">
          {logs.map(log => (
            <button
              key={log.id}
              onClick={() => setActiveLogId(log.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold text-sm transition-all flex-1 ${
                activeLogId === log.id 
                  ? 'bg-brand-primary text-white shadow-md scale-95' 
                  : 'text-brand-primary/60 hover:bg-brand-surface'
              }`}
            >
              {log.title}
            </button>
          ))}
        </div>

        {/* The Interactive Circular Tasbih */}
        <div 
          onClick={handleTap}
          className="relative w-72 h-72 flex items-center justify-center cursor-pointer active:scale-95 transition-transform duration-100 group select-none touch-manipulation"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors"></div>
          
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
            <circle 
              cx="144" cy="144" r={radius} 
              fill="transparent" 
              stroke="rgba(9, 112, 99, 0.1)" 
              strokeWidth="16" 
            />
            <circle 
              cx="144" cy="144" r={radius} 
              fill="transparent" 
              stroke="#F3AA60" 
              strokeWidth="16" 
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 0.3s ease-in-out'
              }}
            />
          </svg>

          {/* Center Data */}
          <div className="flex flex-col items-center text-center z-10 pointer-events-none">
            <span className="text-6xl font-bold text-brand-primary tracking-tighter drop-shadow-sm mb-1">
              {activeLog.count.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-widest text-brand-primary/50 font-bold">
              Target: {safeTarget}
            </span>
          </div>
        </div>

        <p className="mt-8 text-sm text-brand-primary/60 text-center px-8">
          Tap anywhere on the circle to count. The golden ring will reset every {safeTarget} recitations.
        </p>

        {/* Controls */}
        <div className="mt-12 flex gap-6">
          <button 
            onClick={handleReset}
            className="w-14 h-14 bg-white border border-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>

      </div>
    </main>
  );
}
