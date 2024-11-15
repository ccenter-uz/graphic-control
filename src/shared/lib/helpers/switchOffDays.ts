import { weekDays } from "@shared/constants/weekDays";

export function switchOffDays(offDays: string[]) {
  return offDays?.map((day) => weekDays[day]) || [];
}
