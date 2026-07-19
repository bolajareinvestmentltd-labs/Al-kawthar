import surahIndex from '../data/surah-meta.json';

// The Live Quran API Engine
export async function getFullSurah(surahNumber) {
  const surahId = Number(surahNumber);
  if (!Number.isFinite(surahId) || surahId < 1 || surahId > 114) {
    return null;
  }

  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,en.sahih,ar.alafasy`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();

    if (data.code !== 200 || !Array.isArray(data.data) || data.data.length < 3) {
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
    console.error('API Engine Error:', error);
    const fallback = surahIndex.find((item) => item.number === surahId);
    if (!fallback) return null;

    return {
      name: fallback.name,
      translationName: fallback.englishNameTranslation,
      revelationType: fallback.revelationType,
      totalVerses: fallback.numberOfAyahs,
      verses: []
    };
  }
}
