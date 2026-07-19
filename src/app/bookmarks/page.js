'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../../lib/supabase';
import { getDeviceId } from '../../lib/deviceId';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchBookmarks() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setErrorMessage('Bookmarks require Supabase environment configuration.');
        setLoading(false);
        return;
      }

      const deviceId = getDeviceId();
      
      // Fetch only the bookmarks for THIS specific device
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', deviceId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching bookmarks:', error);
        setErrorMessage('Unable to load bookmarks right now.');
      } else if (data) {
        setBookmarks(data);
      }

      setLoading(false);
    }
    fetchBookmarks();
  }, []);

  return (
    <main className="min-h-screen py-8 px-4 max-w-md mx-auto relative bg-brand-cream">
      
      <header className="mb-10 flex items-center relative h-10">
        <Link href="/" className="absolute left-0 text-brand-terracotta hover:text-brand-dark transition p-2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-brand-terracotta absolute w-full text-center">
          My Bookmarks
        </h1>
      </header>

      {loading ? (
        <p className="text-center font-sans text-brand-terracotta animate-pulse">Loading saved verses...</p>
      ) : errorMessage ? (
        <div className="text-center mt-20">
          <svg className="w-16 h-16 mx-auto text-brand-terracotta/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16h.01" /></svg>
          <p className="font-sans text-gray-500">{errorMessage}</p>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="flex flex-col gap-4">
          {bookmarks.map((bookmark) => (
            <Link 
              href={`/surah/${bookmark.chapter_id}`} 
              key={bookmark.id}
              className="bg-white border border-brand-terracotta/20 rounded-xl p-5 flex items-center justify-between hover:border-brand-terracotta hover:shadow-sm transition-all group"
            >
              <div>
                <p className="font-heading font-bold text-brand-dark text-lg mb-1">
                  Surah {bookmark.chapter_id}
                </p>
                <p className="font-sans text-sm text-gray-500">
                  Verse {bookmark.verse_number}
                </p>
              </div>
              <div className="text-brand-terracotta group-hover:translate-x-1 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
