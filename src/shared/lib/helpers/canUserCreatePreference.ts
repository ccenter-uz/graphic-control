export function canUserCreatePreference(): boolean {
  const today = new Date();
  const currentDay = 15;
  const currentMonth = today.getMonth() + 1 === 12 ? 1 : today.getMonth() + 1;
  const currentYear =
    today.getMonth() + 1 === 12 ? today.getFullYear() + 1 : today.getFullYear();

  console.log(currentYear, currentMonth, currentDay);

  if (yearFromParams && monthFromParams) {
    if (
      currentYear == yearFromParams &&
      currentMonth == monthFromParams &&
      15 <= currentDay &&
      currentDay <= 25
    ) {
      return true;
    }
  }

  return false;
}
