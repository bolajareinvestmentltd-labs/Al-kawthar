// The Live Quran API Engine
export async function getFullSurah(surahNumber) {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ar.alafasy`);
    const data = await res.json();

    if (data.code !== 200) throw new Error('Failed to fetch Surah');

    const arabicEdition = data.data[0];
    const englishEdition = data.data[1];
    const audioEdition = data.data[2];

    // The exact string the API uses for Bismillah
    const bismillahPrefix = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ";

    const verses = arabicEdition.ayahs.map((ayah, index) => {
      let cleanText = ayah.text;

      // THE SANITIZER: If it's Verse 1, and NOT Surah 1 or 9, slice off the Bismillah
      if (surahNumber != 1 && surahNumber != 9 && ayah.numberInSurah === 1) {
        if (cleanText.startsWith(bismillahPrefix)) {
          cleanText = cleanText.replace(bismillahPrefix, '');
        }
      }

      return {
        id: ayah.number,
        verse_number: ayah.numberInSurah,
        text_uthmani: cleanText,
        translation: englishEdition.ayahs[index].text,
        audio: audioEdition.ayahs[index].audio,
        transliteration: "Transliteration loading..." 
      };
    });

    return {
      name: arabicEdition.englishName,
      translationName: arabicEdition.englishNameTranslation,
      revelationType: arabicEdition.revelationType,
      totalVerses: arabicEdition.numberOfAyahs,
      verses: verses
    };
  } catch (error) {
    console.error("API Engine Error:", error);
    return null;
  }
}
