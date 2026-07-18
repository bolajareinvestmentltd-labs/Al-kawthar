import { create } from 'zustand';

interface Ayah {
  number: number;
  audio: string;
  text: string;
}

interface AudioStore {
  currentSurahId: number | null;
  currentAyahIndex: number;
  queue: Ayah[];
  isPlaying: boolean;
  setQueue: (ayahs: Ayah[], surahId: number) => void;
  playAyah: (index: number) => void;
  playNext: () => void;
  togglePlay: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  currentSurahId: null,
  currentAyahIndex: 0,
  queue: [],
  isPlaying: false,
  
  setQueue: (ayahs, surahId) => set({ queue: ayahs, currentSurahId: surahId, currentAyahIndex: 0 }),
  
  playAyah: (index) => set({ currentAyahIndex: index, isPlaying: true }),
  
  playNext: () => {
    const { currentAyahIndex, queue } = get();
    if (currentAyahIndex < queue.length - 1) {
      set({ currentAyahIndex: currentAyahIndex + 1, isPlaying: true });
    } else {
      set({ isPlaying: false });
    }
  },
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
