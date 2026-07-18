import { useEffect, useRef } from 'react';
import { useAudioStore } from '@/store/useAudioStore';

export const AudioEngine = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { queue, currentAyahIndex, isPlaying, playNext } = useAudioStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Playback prevented:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentAyahIndex]);

  const currentTrack = queue[currentAyahIndex]?.audio;

  return (
    <audio
      ref={audioRef}
      src={currentTrack}
      onEnded={playNext}
      className="hidden"
    />
  );
};
