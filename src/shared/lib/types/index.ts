export interface ICheckbox {
  id: number;
  isWorkDay: boolean;
  isOrder: boolean;
  isNight: boolean;
  isHoliday: boolean;
  isToday: boolean;
  isCheckable: boolean;
  label: number;
  shouldBeOffday: boolean;
  customOffday?: boolean;
  systemSuggestsLikeWorkday?: boolean;
  isSelectLikeHoliday?: boolean;
}

export interface IWeekDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  [key: string]: boolean;
}
