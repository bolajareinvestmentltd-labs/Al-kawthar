'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const FloatingNav = () => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -500, bottom: 50 }}
      className="fixed bottom-20 left-4 right-4 z-[1000] p-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-100 flex justify-around items-center cursor-grab"
    >
      <nav className="flex gap-6 text-xs font-medium text-slate-600">
        <Link href="/">Home</Link>
        <Link href="/listen/quran">Quran</Link>
        <span>Hadith</span>
        <Link href="/settings">Settings</Link>
      </nav>
    </motion.div>
  );
};
