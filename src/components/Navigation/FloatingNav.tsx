'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const FloatingNav = () => {
  return (
    <div className="fixed inset-x-4 bottom-5 z-[1000] mx-auto max-w-xl px-2">
      <div className="rounded-full bg-white/95 px-2 py-2 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 backdrop-blur-xl">
        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Link href="/" className="rounded-full bg-slate-100 px-4 py-3 text-center text-[11px] font-semibold uppercase text-slate-700 transition hover:bg-brand-primary/15 hover:text-brand-primary sm:text-sm">
            Home
          </Link>
          <Link href="/listen" className="rounded-full bg-slate-100 px-4 py-3 text-center text-[11px] font-semibold uppercase text-slate-700 transition hover:bg-brand-primary/15 hover:text-brand-primary sm:text-sm">
            Listen
          </Link>
          <Link href="/citadel" className="rounded-full bg-slate-100 px-4 py-3 text-center text-[11px] font-semibold uppercase text-slate-700 transition hover:bg-brand-primary/15 hover:text-brand-primary sm:text-sm">
            Citadel
          </Link>
          <Link href="/settings" className="rounded-full bg-slate-100 px-4 py-3 text-center text-[11px] font-semibold uppercase text-slate-700 transition hover:bg-brand-primary/15 hover:text-brand-primary sm:text-sm">
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};
