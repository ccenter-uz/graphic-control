type ICheckbox = {
  id: number;
  isWorkDay: boolean;
  isOrder: boolean;
  isNight: boolean;
  isHoliday: boolean;
  isToday: boolean;
  isCheckable: boolean;
  label: number;
};

export const chunkArray = (array: ICheckbox[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
