import { ICheckbox } from "../types";

import { monthToWeeks } from "./monthToWeeks";
export function getTargetWeek(targetId: number, data: ICheckbox[]) {
  return monthToWeeks(data).find((subArray) => {
    return subArray.find((item) => targetId == item?.id);
  });
}
