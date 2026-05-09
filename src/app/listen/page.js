import Link from 'next/link';
import { getAllChapters, getAllChapterAudio } from '../../lib/api';
import ListenPlayer from '../../components/ListenPlayer';

export default async function ListenPage() {
  const chapters = await getAllChapters();
  const audioData = await getAllChapterAudio();

  return (
    <main className="min-h-screen py-8 px-4 max-w-md mx-auto flex flex-col justify-center relative">
      
      <header className="mb-8 flex items-center w-full relative h-10">
        <Link href="/" className="absolute left-0 text-brand-terracotta hover:text-brand-dark transition p-2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-terracotta absolute w-full text-center">
          Listen Mode
        </h1>
      </header>

      <ListenPlayer chapters={chapters} audioData={audioData} />
      
    </main>
  );
}
