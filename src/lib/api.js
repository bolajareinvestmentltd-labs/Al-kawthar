import surahIndex from '../data/surah-meta.json';

const localSurahMap = new Map(
  surahIndex.map((surah) => [Number(surah.number), surah])
);

function buildLocalFallbackSurah(surahId, fallback) {
  if (!fallback) return null;

  return {
    name: fallback.name,
    translationName: fallback.englishNameTranslation,
    revelationType: fallback.revelationType,
    totalVerses: fallback.numberOfAyahs,
    verses: [],
    source: 'local-fallback'
  };
}

// The Live Quran API Engine
export async function getFullSurah(surahNumber) {
  const surahId = Number(surahNumber);
  const fallbackId = Number.isFinite(surahId) && surahId >= 1 && surahId <= 114 ? surahId : null;
  const fallback = fallbackId ? localSurahMap.get(fallbackId) : null;

  if (!fallback) return null;

  const idToFetch = fallbackId ?? 1;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${idToFetch}/editions/quran-uthmani,en.sahih,ar.alafasy`,
      { next: { revalidate: 300 }, signal: controller.signal }
    );
    const data = await res.json();

    if (data.code !== 200 || !Array.isArray(data.data) || data.data.length < 3) {
      console.warn('Quran API returned an invalid response; using local metadata fallback', {
        status: res.status,
        statusText: res.statusText,
        requestedSurah: idToFetch,
      });
      throw new Error('Invalid Quran API response');
    }

    const arabicEdition = data.data[0];
    const englishEdition = data.data[1];
    const audioEdition = data.data[2];

    const bismillahPrefix = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ';

    const verses = arabicEdition.ayahs.map((ayah, index) => {
      let cleanText = ayah.text;

      if (surahId !== 1 && surahId !== 9 && ayah.numberInSurah === 1 && cleanText.startsWith(bismillahPrefix)) {
        cleanText = cleanText.replace(bismillahPrefix, '');
      }

      return {
        id: ayah.number,
        verse_number: ayah.numberInSurah,
        text_uthmani: cleanText,
        translation: englishEdition.ayahs[index]?.text ?? 'Translation unavailable',
        audio: audioEdition.ayahs[index]?.audio ?? null,
        transliteration: 'Transliteration loading...'
      };
    });

    return {
      name: arabicEdition.englishName,
      translationName: arabicEdition.englishNameTranslation,
      revelationType: arabicEdition.revelationType,
      totalVerses: arabicEdition.numberOfAyahs,
      verses
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Quran API unavailable; using local metadata fallback', {
      requestedSurah: idToFetch,
      reason: message,
    });
    return buildLocalFallbackSurah(fallbackId, fallback);
  } finally {
    clearTimeout(timeoutId);
  }
}
