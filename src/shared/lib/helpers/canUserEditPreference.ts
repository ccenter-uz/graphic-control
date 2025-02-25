const PREFERENCE = {
  START: 15,
  END: 25,
};

export function canUserEditPreference(
  monthFromParams: number,
  yearFromParams: number,
): boolean {
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (yearFromParams && monthFromParams) {
    if (
      currentYear === yearFromParams &&
      monthFromParams - currentMonth === 1 &&
      PREFERENCE.START <= currentDate &&
      currentDate <= PREFERENCE.END
    ) {
      return true;
    } else if (
      yearFromParams - currentYear === 1 &&
      monthFromParams === 1 &&
      currentMonth === 12 &&
      PREFERENCE.START <= currentDate &&
      currentDate <= PREFERENCE.END
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
