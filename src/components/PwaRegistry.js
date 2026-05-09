'use client';

import { useEffect } from 'react';

export default function PwaRegistry() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('Background Engine Registered Successfully.');
          },
          function(err) {
            console.log('Background Engine Registration Failed: ', err);
          }
        );
      });
    }
  }, []);

  return null; // This component is invisible
}
