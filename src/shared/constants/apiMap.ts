export enum API_MAP {
  // Authentication
  SIGN_IN = "user/signIn",
  GET_USER_INFO = "one",

  // Preference
  GET_ALL_PREFERENCES = "all",
  GET_PREFERENCES_BY_YEAR = "all?year=",
  GET_SINGLE_PREFERENCE_BY_ID = "one/",
  CREATE_PREFERENCE = "create",
  UPDATE_PREFERENCE = "update/",

  // Schedule
  GET_ALL_SCHEDULES = "get-all-month",
  GET_SINGLE_SCHEDULE_BY_MONTH = "one-with-graphic?year_and_month=",
  GET_SINGLE_SCHEDULE_HELPERS = "data-months?year_and_month=",
  GET_ALL_SUPERVISORS = "get-supervisors",
  GET_SINGLE_SCHEDULE_OF_SUPERVISOR = "get-operator-by-id/",
}
