"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGlobalAudio } from '../../../context/AudioProvider';

// Dummy vault for testing auto-flow. We will replace with the full 40 URLs later.
const rabbanaVault = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Rabbana ${i + 1}`,
  subtitle: 'Quranic Supplication',
  arabic: `رَبَّنَا ${i + 1}`,
  translation: `Our Lord — supplication ${i + 1}`,
  // Using 3 short real audio files to test the playlist flow, the rest are placeholders
  url: i === 0 ? 'https://everyayah.com/data/Alafasy_128kbps/002201.mp3' :
       i === 1 ? 'https://everyayah.com/data/Alafasy_128kbps/002250.mp3' :
       i === 2 ? 'https://everyayah.com/data/Alafasy_128kbps/002286.mp3' : 
       `https://dummy-link-for-rabbana-${i+1}.mp3`
}));

export default function RabbanaPlaylist() {
  const { isPlaying, currentTrack, playTrack, togglePlay, playNext, playPrev } = useGlobalAudio();

  const [vault, setVault] = useState(rabbanaVault);
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTimestamps, setEditTimestamps] = useState('');
  const [validateStatus, setValidateStatus] = useState({});

  // Load overrides from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('rabbanaMeta');
      if (raw) {
        const meta = JSON.parse(raw);
        setVault(prev => prev.map(item => ({ ...item, ...(meta[item.id] || {}) })));
      }
    } catch (e) {
      console.warn('Failed reading rabbanaMeta', e);
    }
  }, []);

  const persistMeta = (id, patch) => {
    try {
      const raw = localStorage.getItem('rabbanaMeta');
      const meta = raw ? JSON.parse(raw) : {};
      meta[id] = { ...(meta[id] || {}), ...patch };
      localStorage.setItem('rabbanaMeta', JSON.stringify(meta));
    } catch (e) {
      console.warn('Failed persisting rabbanaMeta', e);
    }
  };

  const handlePlayAll = () => {
    // Passes the entire vault to the queue, starting at index 0
    playTrack(vault[0], vault, 0);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditUrl(item.url || '');
    setEditTimestamps((item.timestamps || []).join(','));
  };

  const saveEdit = (id) => {
    const timestamps = editTimestamps.split(',').map(s => Number(s.trim())).filter(n => !Number.isNaN(n));
    const updated = vault.map(v => v.id === id ? { ...v, url: editUrl, timestamps } : v);
    setVault(updated);
    persistMeta(id, { url: editUrl, timestamps });
    setEditingId(null);
  };

  const validateUrl = async (id, url) => {
    if (!url) return setValidateStatus(prev => ({ ...prev, [id]: 'empty' }));
    try {
      setValidateStatus(prev => ({ ...prev, [id]: 'checking' }));
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) setValidateStatus(prev => ({ ...prev, [id]: 'ok' }));
      else setValidateStatus(prev => ({ ...prev, [id]: `status:${res.status}` }));
    } catch (e) {
      setValidateStatus(prev => ({ ...prev, [id]: 'error' }));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl('');
    setEditTimestamps('');
  };

  const showTimestampHint = (ts) => {
    if (!ts || !ts.length) return '—';
    return ts.slice(0,5).join(', ')+(ts.length>5? ' …':'');
  };
    <main className="min-h-screen bg-brand-surface font-sans fade-in pb-32">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-brand-surface/90 backdrop-blur-md px-4 pt-8 pb-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link href="/listen" className="p-2 -ml-2 text-brand-primary hover:bg-brand-primary/10 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <h1 className="font-heading text-xl font-bold text-brand-dark">40 Rabbanas</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-4 flex flex-col gap-6">
        
        {/* The Playlist Control Hero */}
        <div className="w-full bg-gradient-to-br from-brand-primary to-[#064e44] rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
           
           <h2 className="font-heading text-3xl font-bold mb-2 drop-shadow-md">The 40 Rabbanas</h2>
           <p className="text-xs text-brand-accent uppercase tracking-widest font-bold mb-8">Continuous Recitation</p>
           
           {/* Big Media Controls */}
           <div className="flex items-center justify-center gap-8">
              <button onClick={playPrev} className="text-white/70 hover:text-white hover:scale-110 transition">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              
              <button 
                onClick={handlePlayAll}
                className="w-16 h-16 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
              >
                {isPlaying && currentTrack?.title.includes("Rabbana") ? (
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                   <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              
              <button onClick={playNext} className="text-white/70 hover:text-white hover:scale-110 transition">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
           </div>
        </div>

        {/* The Track List */}
        <div className="flex flex-col gap-2">
          {vault.map((track, index) => {
            const isThisTrackPlaying = currentTrack?.url === track.url;
            const isAvailable = track.url && !String(track.url).includes('dummy-link');

            return (
              <div 
                key={track.id}
                className={`flex flex-col p-4 rounded-2xl transition border ${
                  isThisTrackPlaying 
                    ? 'bg-brand-primary text-white border-brand-primary shadow-md' 
                    : 'bg-white text-brand-dark border-brand-primary/10 hover:border-brand-primary/30'
                }`}
              >
                <div className="flex items-start gap-4 w-full">
                   <span className={`font-bold w-8 ${isThisTrackPlaying ? 'text-brand-accent' : 'text-brand-primary/40'}`}>
                     {track.id < 10 ? `0${track.id}` : track.id}
                   </span>
                   <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm">{track.title}</span>
                          <span className="text-[11px] text-gray-400">{track.subtitle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => isAvailable && playTrack(track, vault, index)} className="px-3 py-1 rounded-md bg-white/10 text-white text-sm">Play</button>
                          <button onClick={() => startEdit(track)} className="px-2 py-1 rounded-md bg-gray-100 text-xs">Edit</button>
                        </div>
                      </div>
                      <p className="font-arabic text-lg text-right mt-2">{track.arabic}</p>
                      <p className="font-sans text-sm text-gray-700 mt-2">{track.translation}</p>
                      <p className="text-xs text-gray-400 mt-2">Timestamps: {showTimestampHint(track.timestamps)}</p>
                   </div>
                </div>

                {isThisTrackPlaying && isPlaying && (
                  <div className="flex gap-0.5 items-end h-3 mr-2 mt-3">
                    <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite] h-full"></div>
                    <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite_0.2s] h-1/2"></div>
                    <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite_0.4s] h-3/4"></div>
                  </div>
                )}

                {!isAvailable && (
                  <div className="text-xs text-red-500 mt-2">Audio URL not available for this item.</div>
                )}

                {editingId === track.id && (
                  <div className="mt-3 p-3 bg-white/90 rounded-md border border-gray-100">
                    <label className="block text-xs font-semibold mb-1">Audio URL</label>
                    <input value={editUrl} onChange={e=>setEditUrl(e.target.value)} className="w-full p-2 rounded-md border" />
                    <label className="block text-xs font-semibold mt-2 mb-1">Timestamps (comma-separated seconds)</label>
                    <input value={editTimestamps} onChange={e=>setEditTimestamps(e.target.value)} className="w-full p-2 rounded-md border" />
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 rounded-md bg-brand-primary text-white" onClick={()=>saveEdit(track.id)}>Save</button>
                      <button className="px-3 py-1 rounded-md bg-gray-100" onClick={cancelEdit}>Cancel</button>
                      <button className="px-3 py-1 rounded-md bg-white/70" onClick={()=>validateUrl(track.id, editUrl)}>Validate</button>
                      <div className="text-xs text-gray-500 self-center ml-2">{validateStatus[track.id]}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
