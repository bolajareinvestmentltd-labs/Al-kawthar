import './globals.css';
import { AudioProvider } from '../context/AudioProvider';
import MiniPlayer from '../components/MiniPlayer';
import PwaRegistry from '../components/PwaRegistry';

export const metadata = {
  title: 'Al-Kawthar',
  description: 'The Citadel of Believers',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#097063',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-brand-surface antialiased selection:bg-brand-accent selection:text-white">
        <AudioProvider>
          <div className="w-full h-full min-h-[100dvh] max-w-md mx-auto bg-brand-surface relative shadow-2xl overflow-x-hidden flex flex-col">
            
            {/* The Main Screen Content */}
            <div className="flex-1 flex flex-col">
              {children}
            </div>

            {/* The Global Signature Architecture */}
            <footer className="w-full py-12 flex flex-col items-center justify-center opacity-80 border-t border-brand-primary/10 mt-auto pb-32">
              <div className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold font-heading mb-3 shadow-md">N</div>
              <p className="font-sans text-[8px] uppercase tracking-widest text-brand-dark/70 font-bold max-w-[250px] leading-relaxed text-center">
                Forged with love and self-discovery in the worship of Allah by
              </p>
              <div className="font-sans text-xs text-brand-primary font-bold mt-1">
                JcLs (Jare's Choice Labs)
              </div>
            </footer>

            {/* Global Overlays */}
            <MiniPlayer />
            <PwaRegistry />
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
