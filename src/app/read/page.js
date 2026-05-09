import Link from 'next/link';
import { getAllChapters } from '../../lib/api';

export default async function ReadPage() {
  const chapters = await getAllChapters();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <header className="mb-10 flex items-center relative">
        <Link href="/" className="text-brand-terracotta hover:text-brand-dark transition p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-3xl font-bold text-brand-terracotta absolute left-1/2 -translate-x-1/2">
          Read Quran
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chapter) => (
          <Link href={`/surah/${chapter.id}`} key={chapter.id}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-terracotta/10 hover:border-brand-terracotta transition cursor-pointer flex justify-between items-center group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-terracotta font-bold border border-brand-terracotta/20">{chapter.id}</div>
                <div>
                  <h2 className="font-bold text-brand-dark group-hover:text-brand-terracotta transition">{chapter.name_simple}</h2>
                  <p className="text-sm text-gray-500 font-sans">{chapter.translated_name.name}</p>
                </div>
              </div>
              <div className="font-arabic text-2xl text-brand-dark">{chapter.name_arabic}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
