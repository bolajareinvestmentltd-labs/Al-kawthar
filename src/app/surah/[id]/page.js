import SurahReader from '../../../components/SurahReader';
import { getFullSurah } from '../../../lib/api';
import Link from 'next/link';

export default async function SurahPage({ params }) {
  const surahId = params?.id;
  const surah = await getFullSurah(surahId);

  if (!surah) {
    return (
      <div className="min-h-screen bg-brand-surface flex flex-col items-center justify-center fade-in">
        <p className="font-bold text-brand-primary uppercase tracking-widest text-xs">Failed to load Surah.</p>
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

      <SurahReader verses={surah.verses} chapterId={surahId} />
    </main>
  );
}
