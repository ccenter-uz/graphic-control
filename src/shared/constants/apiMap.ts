export enum API_MAP {
  SIGN_IN = "Auth/user/signIn",
  GET_ALL_PREFERENCES = "Application/all",
  GET_PREFERENCES_BY_YEAR = "Application/all?year=",
  GET_SINGLE_PREFERENCE_BY_ID = "Application/one/",
  GET_USER_INFO = "Auth/one",
  CREATE_PREFERENCE = "Application/create",
  UPDATE_PREFERENCE = "Application/update/",
  GET_ALL_SCHEDULES = "get-all-month",
  GET_SINGLE_SCHEDULE_BY_MONTH = "one-with-graphic?year_and_month=",
}
