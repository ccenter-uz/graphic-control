import { ICheckbox } from "../types";

export function mergeArrays(
  generatedData: ICheckbox[],
  dataFromApi: ICheckbox[],
) {
  return generatedData.map((item1) => {
    const matchingItem = dataFromApi.find((item2) => item2.label === item1.id);

    if (matchingItem) {
      return { ...item1, ...matchingItem };
    }

    return item1;
  });
}
