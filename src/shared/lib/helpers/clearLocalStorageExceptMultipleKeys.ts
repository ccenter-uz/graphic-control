export function clearLocalStorageExceptMultipleKeys(
  keysToKeep: string[],
): void {
  const savedItems: Record<string, string> = {};

  keysToKeep.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      savedItems[key] = value;
    }
  });

  localStorage.clear();

  Object.keys(savedItems).forEach((key) => {
    localStorage.setItem(key, savedItems[key]);
  });
}
