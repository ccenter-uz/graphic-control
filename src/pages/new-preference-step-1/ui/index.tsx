import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { SelectWeekendDays } from "@widgets/select-weekend-days";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep1 = () => {
  const [timeParams] = useSearchParams();
  const { setHours } = useContext(NewPreferenceContext) || {};
  setHours && setHours(timeParams.get("time")?.toString() || "");

  return (
    <div>
      <SelectWeekendDays />
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link to={`/new-preference/steps/2?${timeParams}`}>
        <BaseButton>Подтвердить</BaseButton>
      </Link>
    </div>
  );
};
