'use client';

import { useState } from 'react';

export const TypographySettings = () => {
  const [fontSize, setFontSize] = useState(24);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <h2 className="text-lg font-serif mb-4">Typography Settings</h2>
      <label className="block text-sm text-slate-600 mb-2">
        Arabic Font Size: {fontSize}px
      </label>
      <input
        type="range"
        min="18"
        max="40"
        value={fontSize}
        onChange={handleSizeChange}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      />
      <div 
        className="mt-6 p-4 border rounded-xl"
        style={{ fontSize: `${fontSize}px`, lineHeight: 2.5, fontFamily: 'serif' }}
      >
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </div>
    </div>
  );
};
