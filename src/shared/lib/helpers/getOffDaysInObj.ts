export function getOffDaysInObj(
  startDay: string,
  endDay: string,
): Record<string, boolean> {
  const weekdaysMap: Record<string, string> = {
    пн: "monday",
    вт: "tuesday",
    ср: "wednesday",
    чт: "thursday",
    пт: "friday",
    сб: "saturday",
    вс: "sunday",
  };

  const result: Record<string, boolean> = Object.values(weekdaysMap).reduce(
    (acc, day) => {
      acc[day] = false; // Default all days to true
      return acc;
    },
    {} as Record<string, boolean>,
  );

  // Set only the specified days to false
  result[weekdaysMap[startDay]] = true;
  result[weekdaysMap[endDay]] = true;

  return result;
}
