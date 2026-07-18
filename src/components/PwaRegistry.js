'use client';

import { useEffect } from 'react';

export default function PwaRegistry() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ Citadel Vault (Service Worker) Active:', registration.scope);
        })
        .catch((error) => {
          console.error('❌ Service Worker Registration Failed:', error);
        });
    }
  }, []);

  return null; // This component is invisible, it just runs the background logic
}
