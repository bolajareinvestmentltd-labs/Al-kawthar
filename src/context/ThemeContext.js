'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1); // 1 is normal, 1.2 is large, etc.

  // Load saved settings when the app opens
  useEffect(() => {
    const savedTheme = localStorage.getItem('kawthar_theme');
    const savedFont = localStorage.getItem('kawthar_font_size');
    
    if (savedTheme === 'dark') setIsDarkMode(true);
    if (savedFont) setFontSizeMultiplier(parseFloat(savedFont));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('kawthar_theme', newTheme ? 'dark' : 'light');
  };

  const changeFontSize = (multiplier) => {
    setFontSizeMultiplier(multiplier);
    localStorage.setItem('kawthar_font_size', multiplier.toString());
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, fontSizeMultiplier, changeFontSize }}>
      <div className={`${isDarkMode ? 'dark bg-gray-900 text-brand-cream' : 'bg-brand-cream text-brand-dark'} min-h-screen transition-colors duration-500`} style={{ fontSize: `${fontSizeMultiplier}rem` }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
