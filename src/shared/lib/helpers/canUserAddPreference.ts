const PREFERENCE = {
  START: 15,
  END: 25,
};

export function canUserAddPreference(
  monthFromParams: number,
  yearFromParams: number,
) {
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (yearFromParams && monthFromParams) {
    if (
      currentYear === yearFromParams &&
      currentMonth + 1 === monthFromParams &&
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
