import { Playfair_Display, Amiri_Quran, Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from '../context/ThemeContext'; // Import our new engine

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const amiri = Amiri_Quran({ weight: '400', subsets: ['arabic'], variable: '--font-amiri' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Fixed: metadata no longer contains themeColor
export const metadata = {
  title: "Al-Kawthar",
  description: "Read and listen to the Holy Quran.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Kawthar",
  },
};

// Fixed: themeColor moved to viewport as Next.js requested
export const viewport = {
  themeColor: "#E2725B",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${amiri.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
