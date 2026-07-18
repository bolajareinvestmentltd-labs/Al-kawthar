import type { Metadata } from 'next';
import { AudioProvider } from '@/components/AudioPlayer/AudioProvider';
import { FloatingNav } from '@/components/Navigation/FloatingNav';
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
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((reg) => console.log('SW registered:', reg))
                  .catch((err) => console.log('SW failed:', err));
              });
            }
          `
        }} />
      </head>
      <body>
        <AudioProvider>
          {children}
          <FloatingNav />
        </AudioProvider>
      </body>
    </html>
  );
}
