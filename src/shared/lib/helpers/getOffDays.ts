interface IStoredOffDays {
  friday: boolean;
  monday: boolean;
  saturday: boolean;
  sunday: boolean;
  thursday: boolean;
  tuesday: boolean;
  wednesday: boolean;
}

export function getOffDays(storedOffDays: IStoredOffDays) {
  const keys = Object.keys(storedOffDays).filter(
    (key) => storedOffDays[key as keyof IStoredOffDays] === true,
  );
  const getNeedLetters = keys.map((item) => item.slice(0, 3));
  return getNeedLetters;
}
