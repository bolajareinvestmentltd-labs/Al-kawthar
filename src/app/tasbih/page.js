'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TasbihPage() {
  const [count, setCount] = useState(0);
  const [sessionTitle, setSessionTitle] = useState('');
  const [logs, setLogs] = useState([]);

  // 1. ENGINE START: Load saved logs from the phone's memory when the page opens
  useEffect(() => {
    const savedLogs = localStorage.getItem('kawthar_tasbih_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleTap = () => setCount(prev => prev + 1);
  const handleReset = () => setCount(0);

  // 2. THE SAVE ENGINE: Package the data, save it to the phone, and update the UI
  const handleSaveLog = () => {
    if (count === 0) return; // Prevent saving empty sessions

    // Create a beautifully formatted timestamp (e.g., "May 8, 3:26 AM")
    const timeStamp = new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true 
    }).format(new Date());

    const newLog = {
      id: Date.now(), // Unique ID for each session
      title: sessionTitle.trim() === '' ? 'Dhikr Session' : sessionTitle,
      count: count,
      time: timeStamp
    };

    // Add the new log to the top of the list
    const updatedLogs = [newLog, ...logs];
    
    setLogs(updatedLogs);
    localStorage.setItem('kawthar_tasbih_logs', JSON.stringify(updatedLogs));

    // Reset the counter and input field so they can start fresh
    setCount(0);
    setSessionTitle('');
  };

  // 3. THE DELETE ENGINE: Remove a specific log if the user wants to clear it
  const handleDeleteLog = (idToRemove) => {
    const updatedLogs = logs.filter(log => log.id !== idToRemove);
    setLogs(updatedLogs);
    localStorage.setItem('kawthar_tasbih_logs', JSON.stringify(updatedLogs));
  };

  return (
    <main className="min-h-screen py-8 px-4 max-w-md mx-auto relative bg-brand-cream flex flex-col items-center">
      
      <header className="mb-8 flex items-center w-full relative h-10">
        <Link href="/" className="absolute left-0 text-brand-terracotta hover:text-brand-dark transition p-2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-terracotta absolute w-full text-center">
          Digital Tasbih
        </h1>
      </header>

      {/* Session Naming Input */}
      <div className="w-full max-w-xs mb-8">
        <input 
          type="text" 
          placeholder="Name this session (e.g. Morning Istighfar)" 
          value={sessionTitle}
          onChange={(e) => setSessionTitle(e.target.value)}
          className="w-full text-center bg-transparent border-b-2 border-brand-terracotta/30 focus:border-brand-terracotta outline-none py-2 font-sans text-lg text-brand-dark placeholder:text-gray-400 placeholder:text-sm transition-colors"
        />
      </div>

      {/* The Main Counter Display */}
      <div className="font-sans text-brand-dark text-8xl font-bold mb-10 tracking-wider">
        {count}
      </div>

      {/* The Giant Tap Button */}
      <button 
        onClick={handleTap}
        className="w-64 h-64 rounded-full bg-brand-terracotta text-white shadow-[0_10px_20px_rgba(226,114,91,0.3)] flex items-center justify-center active:scale-95 active:shadow-inner transition-all duration-150 relative overflow-hidden group mb-10 focus:outline-none"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity"></div>
        <span className="font-sans font-bold text-3xl uppercase tracking-widest">Tap</span>
      </button>

      {/* Control Buttons */}
      <div className="flex gap-4 w-full px-4 justify-center">
        <button 
          onClick={handleReset}
          className="px-6 py-3 rounded-full border border-gray-300 text-gray-500 font-sans text-sm font-bold hover:bg-white hover:border-brand-terracotta hover:text-brand-terracotta transition-colors w-1/3"
        >
          Reset
        </button>
        <button 
          onClick={handleSaveLog}
          className={`px-6 py-3 rounded-full shadow-md font-sans text-sm font-bold transition-all w-2/3 flex justify-center items-center gap-2 ${count > 0 ? 'bg-brand-dark text-white hover:bg-opacity-90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
          Save Log
        </button>
      </div>

      {/* The Live Saved Sessions Log */}
      <div className="w-full mt-12 pt-6 border-t border-brand-terracotta/20">
        <h3 className="font-sans font-bold text-gray-500 text-xs mb-4 uppercase tracking-widest px-2">
          Saved Logs {logs.length > 0 && `(${logs.length})`}
        </h3>
        
        <div className="flex flex-col gap-3">
          {logs.length === 0 ? (
            <p className="text-center text-sm text-gray-400 italic mt-4">Your saved sessions will appear here.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-white p-4 rounded-xl border border-brand-terracotta/10 flex justify-between items-center shadow-sm relative group overflow-hidden fade-in">
                
                <div className="flex-1 pr-4">
                  <p className="font-bold text-brand-dark text-sm truncate">{log.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-brand-cream border border-brand-terracotta/20 text-brand-terracotta font-bold px-4 py-1.5 rounded-full text-sm">
                    {log.count}
                  </div>
                  {/* Subtle Delete Button */}
                  <button 
                    onClick={() => handleDeleteLog(log.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </main>
  );
}
