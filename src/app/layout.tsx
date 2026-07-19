import type { Metadata } from 'next';
import { AudioProvider } from '@/context/AudioProvider';
import { FloatingNav } from '@/components/Navigation/FloatingNav';
import PwaRegistry from '@/components/PwaRegistry';
import MiniPlayer from '@/components/MiniPlayer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Al-Kawthar',
  description: 'Premium Quranic study and daily reflections.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-brand-surface antialiased">
        <AudioProvider>
          <div className="w-full min-h-[100dvh] max-w-screen-2xl mx-auto bg-brand-surface relative overflow-x-hidden flex flex-col">
            <div className="flex-1 flex flex-col pb-36"> {/* space for floating nav + mini player */}
              {children}
            </div>

            <footer className="w-full py-6 flex flex-col items-center justify-center opacity-85 border-t border-brand-primary/10 mt-auto">
              <div className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold font-heading mb-2 shadow-md">N</div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-brand-dark/70 font-bold max-w-[250px] leading-relaxed text-center">
                A mindful companion for Quranic reflection, remembrance, and daily peace.
              </p>
            </footer>

            <FloatingNav />
            <MiniPlayer />
            <PwaRegistry />
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
