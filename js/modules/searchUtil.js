/**
 * SubQ Search Utility
 * Fast and robust Turkish-tolerant normalization for offline searching.
 */

export function normalizeTurkish(text) {
  if (!text) return '';
  return String(text)
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
}

export function fuzzyIncludes(target, query) {
  if (!query) return true;
  if (!target) return false;
  return normalizeTurkish(target).includes(normalizeTurkish(query));
}
