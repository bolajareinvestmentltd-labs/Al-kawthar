export async function getChapterVerses(chapterId) {
  const url = `https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?language=en&words=false&translations=131,57&audio=7&fields=text_uthmani`;
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  return data.verses;
}

export async function getAllChapters() {
  const url = `https://api.quran.com/api/v4/chapters?language=en`;
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  return data.chapters;
}

// NEW: Fetches continuous audio for the Sleep Timer mode (Reciter 7 = Mishary Alafasy)
export async function getAllChapterAudio() {
  const url = `https://api.quran.com/api/v4/chapter_recitations/7`;
  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();
  return data.audio_files;
}
