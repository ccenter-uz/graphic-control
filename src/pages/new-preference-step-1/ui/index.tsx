/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { SelectWeekendDays } from "@widgets/select-weekend-days";

import { weekDays } from "@shared/constants/weekDays";
import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { areObjectsEqual, getLastDayOfCurrentMonth } from "@shared/lib/helpers";
import { IWeekDays } from "@shared/lib/types";
import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep1 = () => {
  const { setHours } = useContext(NewPreferenceContext) || {};
  const [timeParams] = useSearchParams();
  const [isSubmitBtnAble, setIsSubmitBtnAble] = useState<boolean>(true);
  const { setBackLinkPath, setPageHeaderTitle, setSubHeaderInfoData } =
    useContext(NewPreferenceContext) || {};

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
    setBackLinkPath?.("/new-preference");
    setSubHeaderInfoData?.([
      {
        id: 1,
        title: "Календарные дни",
        value: getLastDayOfCurrentMonth(),
      },
    ]);
  }, []);

  useEffect(() => {
    setHours?.(timeParams.get("time")?.toString() || "");
    const timeFromParams = timeParams.get("time");
    localStorage.setItem("workingHours", timeFromParams || "");
    setCloneFormData(JSON.parse(storedFormData as string));
  }, []);

  useEffect(() => {
    setPageHeaderTitle?.("Выберите выходные дни");
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
          Далее
        </BaseButton>
      </Link>
    </div>
  );
};
