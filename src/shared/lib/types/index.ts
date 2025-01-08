export interface ICheckbox {
  id: number;
  isWorkDay: boolean;
  isOrder: boolean;
  isNight: boolean;
  isHoliday: boolean;
  isToday: boolean;
  isCheckable: boolean;
  label: number;
  isAtWork: boolean;
  customOffday?: boolean;
  systemSuggestsLikeWorkday?: boolean;
  isSelectLikeHoliday?: boolean;
}

export interface IPreference {
  id?: string;
  offDays?: string[];
  workingHours?: string;
  daysOfMonth: ICheckbox[];
  description?: string;
  requested_date: string;
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
