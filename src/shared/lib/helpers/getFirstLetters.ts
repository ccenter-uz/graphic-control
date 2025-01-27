export function getFirstLetters(fullName: string): string {
  const words = fullName.split(" ");

  if (words.length < 2) {
    return "";
  }

  const initials = words[0][0] + words[1][0];
  return initials.toUpperCase();
}
