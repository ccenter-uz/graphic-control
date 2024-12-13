import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { SelectWeekendDays } from "@widgets/select-weekend-days";

import { weekDays } from "@shared/constants/weekDays";
import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { areObjectsEqual } from "@shared/lib/helpers";
import { IWeekDays } from "@shared/lib/types";
import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep1 = () => {
  const { setHours } = useContext(NewPreferenceContext) || {};
  const [timeParams] = useSearchParams();
  const [isSubmitBtnAble, setIsSubmitBtnAble] = useState<boolean>(true);
  const defaultFormState: Record<keyof IWeekDays, boolean> = Object.keys(
    weekDays,
  ).reduce((acc, current) => {
    return {
      ...acc,
      [current]: false,
    };
  }, {});
  const storedFormData = localStorage.getItem("offDays");
  const [formState, setFormState] = useState<IWeekDays>(
    storedFormData ? JSON.parse(storedFormData) : defaultFormState,
  );

  const [cloneFormData, setCloneFormData] = useState<IWeekDays[]>([]);

  useEffect(() => {
    setHours?.(timeParams.get("time")?.toString() || "");
    const timeFromParams = timeParams.get("time");
    localStorage.setItem("workingHours", timeFromParams || "");
    setCloneFormData(JSON.parse(storedFormData as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmClick = () => {
    localStorage.setItem("offDays", JSON.stringify(formState));
    if (!areObjectsEqual(cloneFormData[0], formState)) {
      localStorage.removeItem("daysOfMonthAtStep2");
      localStorage.removeItem("cloneDaysArrayAtStep2");
      localStorage.removeItem("cloneDaysArrayAtStep3");
    }
  };

  return (
    <div>
      <SelectWeekendDays
        defaultFormState={defaultFormState}
        formState={formState}
        setFormState={setFormState}
        setIsSubmitBtnAble={setIsSubmitBtnAble}
      />
      <WorkingHours hours={localStorage.getItem("workingHours")?.toString()} />
      <Link
        to={`/new-preference/steps/2?${timeParams}`}
        className={`${
          isSubmitBtnAble ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <BaseButton isDisabled={!isSubmitBtnAble} onClick={handleConfirmClick}>
          Подтвердить1
        </BaseButton>
      </Link>
    </div>
  );
};
