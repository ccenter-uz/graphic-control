export function canUserEditPreference(
  monthFromParams: number,
  yearFromParams: number,
) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (yearFromParams && monthFromParams) {
    if (
      currentYear === yearFromParams &&
      monthFromParams - currentMonth === 1
    ) {
      return true;
    } else if (
      yearFromParams - currentYear === 1 &&
      monthFromParams === 1 &&
      currentMonth === 12
    ) {
      return true;
    } else {
      return false;
    }
  }
}
