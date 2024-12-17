// type ICheckbox = {
//   shouldBeOffday: boolean | undefined;
//   id: number;
//   isWorkDay: boolean;
//   isOrder: boolean;
//   isNight: boolean;
//   isHoliday: boolean;
//   isToday: boolean;
//   isCheckable: boolean;

//   label: number;
// };
import { ICheckbox } from "../types";

export const monthToWeeks = (array: ICheckbox[]) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += 7) {
    chunks.push(array.slice(i, i + 7));
  }
  return chunks;
};
