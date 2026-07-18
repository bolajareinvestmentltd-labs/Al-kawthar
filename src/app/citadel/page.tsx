'use client';

import { useEffect, useState } from 'react';
import { getDailyHadith } from '@/lib/hadithEngine';
import { LibraryVault } from '@/components/Citadel/LibraryVault';
import { LearningPath } from '@/components/Citadel/LearningPath';

interface Hadith {
  text: string;
  source: string;
}

export default function CitadelPage() {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getDailyHadith().then(setHadith);
    const savedCount = localStorage.getItem('hadith-count') || '0';
    setCount(Number(savedCount));
  }, []);

  const handleReflected = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('hadith-count', String(newCount));
  };

  return (
    <main className="p-6 pb-32">
      <h1 className="text-2xl font-serif mb-6">Citadel</h1>
      
      <section className="p-6 bg-slate-50 rounded-2xl mb-8">
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-2">Daily Reflection</h2>
        {hadith && (
          <>
            <p className="font-serif italic text-lg">{hadith.text}</p>
            <p className="text-sm text-indigo-600 mt-2 mb-4">— {hadith.source}</p>
          </>
        )}
        <p className="text-sm text-slate-600 mb-4">Reflections completed: {count}</p>
        <button onClick={handleReflected} className="w-full py-2 bg-slate-900 text-white rounded-xl font-medium text-sm">
          Mark as Reflected
        </button>
      </section>

      <LibraryVault />
      <LearningPath />
    </main>
  );
}
