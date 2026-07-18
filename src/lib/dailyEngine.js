export function getDailyItem(itemsArray) {
  if (!itemsArray || itemsArray.length === 0) return null;
  
  // 1. Get today's exact date
  const today = new Date();
  
  // 2. Calculate the "Day of the Year" (e.g., May 11th = Day 131)
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // 3. The Math Magic: The remainder perfectly loops through the array
  const index = dayOfYear % itemsArray.length;
  
  return itemsArray[index];
}
