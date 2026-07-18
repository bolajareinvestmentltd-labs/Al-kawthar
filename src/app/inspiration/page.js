'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import hadithData from '@/data/hadith.json';

export default function InspirationPage() {
  const [dailyHadith, setDailyHadith] = useState(null);

  useEffect(() => {
    // Logic to select hadith
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyHadith(hadithData[dayOfYear % hadithData.length]);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-serif mb-6">Inspiration</h1>
      {dailyHadith && (
        <div className="p-6 bg-slate-50 rounded-2xl">
          <p className="font-serif italic text-lg">{dailyHadith.text}</p>
          <p className="text-sm text-indigo-600 mt-2">— {dailyHadith.source}</p>
        </div>
      )}
      <Link href="/" className="block mt-6 text-sm text-slate-500 underline">Back to Home</Link>
    </main>
  );
}
