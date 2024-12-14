const dayTranslations: Record<string, string> = {
  monday: "Понедельник",
  tuesday: "Вторник",
  wednesday: "Среда",
  thursday: "Четверг",
  friday: "Пятница",
  saturday: "Суббота",
  sunday: "Воскресенье",
};

export const getTranslatedKeysWithTrueValues = (
  obj: Record<string, boolean>,
): string[] => {
  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key]) => dayTranslations[key]);
};
