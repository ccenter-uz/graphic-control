import { monthToWeeks } from "./monthToWeeks";
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
export function getTargetWeek(targetId: number, data: ICheckbox[]) {
  return monthToWeeks(data).find((subArray) => {
    return subArray.find((item) => targetId == item?.id);
  });
}
