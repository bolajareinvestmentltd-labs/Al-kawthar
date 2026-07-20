import SurahReader from '../../../components/SurahReader';
import { getFullSurah } from '../../../lib/api';
import Link from 'next/link';
import offlineSurahs from '../../../data/surah-meta.json';

export default async function SurahPage({ params }) {
  const resolvedParams = await params;
  const surahKey = resolvedParams?.id;
  const surahId = Number(surahKey);
  const remoteSurah = await getFullSurah(surahKey);
  const offlineSurah = Number.isFinite(surahId)
    ? offlineSurahs.find((surah) => surah.number === surahId)
    : null;

  const surah = remoteSurah ?? (offlineSurah ? { ...offlineSurah, verses: [] } : null);

  if (!surah) {
    return (
      <div className="min-h-screen bg-brand-surface flex flex-col items-center justify-center fade-in px-4 text-center">
        <p className="font-bold text-brand-primary uppercase tracking-widest text-xs mb-4">Failed to load Surah.</p>
        <p className="max-w-md text-sm text-slate-600 mb-6">The requested Surah is not available. Please return to the list and choose a valid chapter.</p>
        <Link href="/read" className="rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20">Back to Surah list</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-surface font-sans pb-40">
      <div className="sticky top-0 z-40 bg-gradient-to-b from-brand-primary to-brand-primary/95 shadow-md px-4 pt-8 pb-6 text-white rounded-b-3xl">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link href="/read" className="p-2 hover:bg-white/10 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold">{surah.name}</h1>
            <p className="text-[10px] text-brand-accent uppercase tracking-widest mt-1">{surah.translationName} • {surah.totalVerses} Verses</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {surah.verses?.length ? (
        <SurahReader verses={surah.verses} chapterId={surahId} />
      ) : (
        <div className="mt-10 max-w-md mx-auto rounded-3xl bg-white p-6 shadow-lg border border-brand-primary/10 text-center">
          <p className="text-brand-dark font-semibold text-lg">Surah metadata loaded successfully.</p>
          <p className="mt-3 text-sm text-slate-600">Verse data is temporarily unavailable. Please refresh this page or try again in a moment.</p>
          <Link href="/read" className="inline-flex mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Browse Surah list</Link>
        </div>
      )}
    </main>
  );
}
