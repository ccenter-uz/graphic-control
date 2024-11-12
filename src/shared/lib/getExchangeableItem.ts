interface ICheckbox {
  id: number;
  isWorkDay: boolean;
  isOrder: boolean;
  isNight: boolean;
  isHoliday: boolean;
  isToday: boolean;
  isCheckable: boolean;
  label: number;
}

export const getExchangeableItem = (
  targetWeek: ICheckbox[],
  indexOfTargetDay: number,
) => {
  const exchangeableItem: ICheckbox[] = [];

  for (let i = indexOfTargetDay; i < targetWeek.length; i++) {
    if (!targetWeek[i]?.isWorkDay) {
      exchangeableItem?.push(targetWeek[i]);
      break;
    }
  }

  if (!exchangeableItem.length) {
    for (let i = indexOfTargetDay - 1; i >= 0; i--) {
      if (!targetWeek[i]?.isWorkDay) {
        exchangeableItem?.push(targetWeek[i]);
        break;
      }
    }
  }

  return exchangeableItem[0] ? exchangeableItem[0] : false;
};
