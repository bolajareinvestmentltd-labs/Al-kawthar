'use client';

import { citadelVault } from '@/lib/citadelData';

export const LibraryVault = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-serif mb-4">Library Vault</h2>
      <div className="space-y-4">
        {Object.keys(citadelVault).map((category) => (
          <div key={category} className="p-4 bg-white rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-2">{category}</h3>
            <p className="text-xs text-slate-500">
              {citadelVault[category as keyof typeof citadelVault].length} items available
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
