import { PREFERENCE } from "@shared/constants/preference-period";

export function isPreferenceEditable(
  monthFromParams: number,
  yearFromParams: number,
) {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1 === 12 ? 1 : today.getMonth() + 1;
  const currentYear =
    today.getMonth() + 1 === 12 ? today.getFullYear() + 1 : today.getFullYear();

  if (yearFromParams && monthFromParams) {
    if (
      currentYear == yearFromParams &&
      currentMonth == monthFromParams &&
      PREFERENCE.START <= currentDay &&
      currentDay <= PREFERENCE.END
    ) {
      return true;
    }
  }

  return false;
}
