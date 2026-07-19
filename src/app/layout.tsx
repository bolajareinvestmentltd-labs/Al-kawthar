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
      <body className="bg-brand-surface antialiased min-h-screen">
        <AudioProvider>
          {children}
          <FloatingNav />
          <MiniPlayer />
          <PwaRegistry />
        </AudioProvider>
      </body>
    </html>
  );
}
