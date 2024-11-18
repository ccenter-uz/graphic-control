import { ICheckbox } from "../types";

export const generateOffDays = (
  weeks: ICheckbox[][],
  firstOffDay: number,
  secondOffDay: number,
) => {
  weeks.forEach((week) => {
    if (week[firstOffDay]) {
      week[firstOffDay].isWorkDay = false;
      week[firstOffDay].isCheckable = false;
    }

    if (week[secondOffDay]) {
      week[secondOffDay].isWorkDay = false;
      week[secondOffDay].isCheckable = false;
    }
  });
};
