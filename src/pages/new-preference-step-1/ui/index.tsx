import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { SelectWeekendDays } from "@widgets/select-weekend-days";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep1 = () => {
  const { setHours } = useContext(NewPreferenceContext) || {};

  const [timeParams] = useSearchParams();
  const [isSubmitBtnAble, setIsSubmitBtnAble] = useState<boolean>(true);

  setHours && setHours(timeParams.get("time")?.toString() || "");

  return (
    <div>
      <SelectWeekendDays setIsSubmitBtnAble={setIsSubmitBtnAble} />
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link
        to={`/new-preference/steps/2?${timeParams}`}
        className={`${
          isSubmitBtnAble ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <BaseButton isDisabled={!isSubmitBtnAble}>Подтвердить</BaseButton>
      </Link>
    </div>
  );
};
