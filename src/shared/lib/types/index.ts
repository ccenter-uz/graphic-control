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
