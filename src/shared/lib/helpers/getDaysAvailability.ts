export function getDaysAvailability(days: string[]) {
  const fullDays = {
    mon: "monday",
    tue: "tuesday",
    wed: "wednesday",
    thu: "thursday",
    fri: "friday",
    sat: "saturday",
    sun: "sunday",
  };

  const output = Object.fromEntries(
    Object.values(fullDays).map((day) => [day, days.includes(day.slice(0, 3))]),
  );
  return output;
}
