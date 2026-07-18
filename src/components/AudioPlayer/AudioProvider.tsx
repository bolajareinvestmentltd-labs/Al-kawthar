'use client';

import type { ReactNode } from 'react';
import { AudioEngine } from './AudioEngine';
import { MiniPlayer } from './MiniPlayer';

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AudioEngine />
      {children}
      <MiniPlayer />
    </>
  );
};
