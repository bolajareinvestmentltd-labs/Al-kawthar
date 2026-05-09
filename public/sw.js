self.addEventListener('install', (event) => {
  console.log('Al-Kawthar Service Worker Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Al-Kawthar Service Worker Activated!');
});

// This is the engine that catches the "Mega Vault" quote and pushes it to the lock screen
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Al-Kawthar', body: 'Time for daily Dhikr.' };
  
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100], // A gentle double-buzz for the notification
    requireInteraction: true // Keeps it on the lock screen until they glance at it!
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
