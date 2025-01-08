import { ICheckbox } from "../types";

export const monthToWeeks = (array: ICheckbox[]) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += 7) {
    chunks.push(array.slice(i, i + 7));
  }
  return chunks;
};
