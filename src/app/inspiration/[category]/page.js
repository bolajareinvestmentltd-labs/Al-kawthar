'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { citadelVault } from '../../../lib/citadelData';

export default function CategoryPage() {
  const params = useParams();
  // Decode the URL (e.g., turns %20 back into a space)
  const categoryName = decodeURIComponent(params.category);
  
  // Fetch the specific list from our Data Vault
  const items = citadelVault[categoryName] || [];

  return (
    <main className="min-h-screen py-8 max-w-md mx-auto relative bg-brand-cream flex flex-col">
      <header className="mb-6 flex items-center px-4 relative h-10">
        <Link href="/inspiration" className="absolute left-4 text-brand-terracotta hover:text-brand-dark transition p-2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="font-heading text-xl font-bold text-brand-terracotta absolute w-full text-center px-12 truncate">
          {categoryName}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-5">
        {items.length === 0 ? (
          <div className="text-center mt-20 text-gray-400">
            <p className="font-sans">More invocations being added to this pillar soon.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-terracotta/10 relative overflow-hidden group hover:border-brand-terracotta hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-brand-terracotta group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M11.3 4.2C11.6 3.5 12.4 3.5 12.7 4.2L14.5 8.6C14.6 8.9 14.9 9.1 15.2 9.1L20 9.5C20.8 9.6 21.1 10.5 20.5 11L16.8 14.1C16.6 14.3 16.5 14.6 16.6 14.9L17.7 19.6C17.9 20.4 17.1 20.9 16.5 20.5L12.4 18C12.1 17.8 11.8 17.8 11.6 18L7.5 20.5C6.8 20.9 6.1 20.4 6.3 19.6L7.4 14.9C7.4 14.6 7.4 14.3 7.1 14.1L3.4 11C2.9 10.5 3.2 9.6 3.9 9.5L8.7 9.1C9 9.1 9.3 8.9 9.4 8.6L11.3 4.2Z"/></svg>
              </div>
              
              <h3 className="font-sans font-bold text-brand-dark mb-4 border-b border-brand-cream pb-2">{item.title}</h3>
              <p className="font-arabic text-3xl text-brand-terracotta leading-relaxed mb-6 text-right" dir="rtl">{item.arabic}</p>
              <div className="mb-6 p-4 bg-brand-cream rounded-lg border border-brand-terracotta/10">
                <p className="font-sans text-brand-dark/80 text-sm italic leading-relaxed">{item.transliteration}</p>
              </div>
              <p className="font-sans text-[15px] text-gray-700 mb-6 leading-relaxed">"{item.english}"</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.reference}</span>
                <button className="text-gray-300 hover:text-brand-terracotta transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
