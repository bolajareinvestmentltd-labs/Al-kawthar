import Link from 'next/link';
import { getChapterVerses } from '../../../lib/api';
import SurahReader from '../../../components/SurahReader'; // Import the new Master Engine

export default async function SurahPage({ params }) {
  const { id } = await params;
  const verses = await getChapterVerses(id);

  if (!verses) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-brand-terracotta font-sans animate-pulse">Loading verses...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 max-w-2xl mx-auto relative">
      
      <header className="mb-8 flex flex-col items-center relative pt-4 px-4">
        <Link href="/" className="absolute left-4 top-4 text-brand-terracotta hover:text-brand-dark transition font-sans text-sm font-medium tracking-wide z-10">
          ← Back to List
        </Link>
        
        <h1 className="font-heading text-4xl font-bold text-brand-terracotta mb-2">
          Surah {id}
        </h1>
      </header>

      {/* Hand all the verses over to the Master DJ */}
      <SurahReader verses={verses} chapterId={id} />
      
    </main>
  );
}
