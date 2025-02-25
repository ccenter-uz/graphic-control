export const getLastDayOfNextMonth = (): string => {
  const now = new Date();
  const month = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
  const year =
    now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();

  return new Date(year, month + 1, 0).getDate().toString();
};
