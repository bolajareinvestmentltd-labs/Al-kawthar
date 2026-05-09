export const getDeviceId = () => {
  if (typeof window !== 'undefined') {
    let deviceId = localStorage.getItem('kawthar_device_id');
    if (!deviceId) {
      // Create a unique random string for this phone
      deviceId = 'device_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem('kawthar_device_id', deviceId);
    }
    return deviceId;
  }
  return 'guest_user'; // Fallback for server-side rendering
};
