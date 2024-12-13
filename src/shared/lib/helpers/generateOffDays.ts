import { ICheckbox } from "../types";

export const generateOffDays = (
  weeks: ICheckbox[][],
  firstOffDay: number,
  secondOffDay: number,
) => {
  return weeks.map((week) => {
    if (week[firstOffDay]) {
      week[firstOffDay].isWorkDay = false;
      week[firstOffDay].isCheckable = false;
    }

    if (week[secondOffDay]) {
      week[secondOffDay].isWorkDay = false;
      week[secondOffDay].isCheckable = false;
    }

    return week;
  });
};
