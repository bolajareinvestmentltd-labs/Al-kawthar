export const getDailyHadith = async () => {
  const response = await fetch('/hadith.json');
  const hadithList = await response.json();
  // Simple deterministic algorithm based on day of the year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return hadithList[dayOfYear % hadithList.length];
};
