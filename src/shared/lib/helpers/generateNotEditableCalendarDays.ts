export function generateNotEditableCalendarDays(
  amountDaysOfCurrentMonth: number,
  amountDaysOfLastMonth: number,
  lastMonthLength: number,
) {
  return Array.from(
    { length: amountDaysOfCurrentMonth + amountDaysOfLastMonth },
    (_, i) => ({
      id:
        i < amountDaysOfLastMonth
          ? i + (lastMonthLength + 1)
          : i - (amountDaysOfLastMonth - 1),
      isWorkDay: i < amountDaysOfLastMonth ? false : true,
      isOrder: false,
      isNight: false,
      isHoliday: false,
      isToday: false,
      isCheckable: i < amountDaysOfLastMonth ? false : true,
      shouldBeOffday: false,
      isAtWork: false,
      label:
        i < amountDaysOfLastMonth
          ? i + (lastMonthLength + 1) - amountDaysOfLastMonth
          : i - (amountDaysOfLastMonth - 1),
    }),
  );
}
