interface IPreference {
  id: string;
  create_data: string;
  requested_date: string;
}

export const findLastPreference = (preferences: IPreference[]) => {
  const lastPreferenceDate = Math.max(
    ...preferences.map((preference: IPreference) =>
      new Date(preference.create_data).getTime(),
    ),
  );

  return (
    preferences.find(
      (item: IPreference) =>
        Number(new Date(item.create_data).getTime()) === lastPreferenceDate,
    ) || null
  );
};
