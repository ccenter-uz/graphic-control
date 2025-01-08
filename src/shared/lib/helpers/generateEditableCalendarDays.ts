export function generateEditableCalendarDays(
  amountDaysOfCurrentMonth: number,
  daysOfLastMonth: number,
) {
  return Array.from(
    { length: amountDaysOfCurrentMonth + daysOfLastMonth },
    (_, i) => ({
      id: i < daysOfLastMonth ? i + 32 : i - (daysOfLastMonth - 1),
      isWorkDay: i < daysOfLastMonth ? false : true,
      isOrder: false,
      isNight: false,
      isHoliday: false,
      isToday: false,
      isAtWork: false,
      isCheckable: i < daysOfLastMonth ? false : true,
      label:
        i < daysOfLastMonth
          ? i + 32 - daysOfLastMonth
          : i - (daysOfLastMonth - 1),
    }),
  );
}
