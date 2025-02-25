export function canUserAddPreference(
  monthFromParams: number,
  yearFromParams: number,
) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (yearFromParams && monthFromParams) {
    if (currentYear === yearFromParams && currentMonth + 1 >= monthFromParams) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}
