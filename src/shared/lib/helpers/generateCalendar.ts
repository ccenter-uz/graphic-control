import { generateNotEditableCalendarDays } from "./generateNotEditableCalendarDays";

const WEEK_DAYS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  0: 7,
};

export function generateCalendar(
  year: number,
  month: number,
  label: number,
  lengthDataFromApi: number,
) {
  const firstDay = new Date(`${year}/${month}/${label}`).getDay();

  const lastMonthLength = new Date(year, month + 1, 0).getDate();

  const remainDay = WEEK_DAYS[firstDay as keyof typeof WEEK_DAYS] - 1;

  const calendar = generateNotEditableCalendarDays(
    lengthDataFromApi,
    remainDay,
    lastMonthLength,
  );

  return calendar;
}
