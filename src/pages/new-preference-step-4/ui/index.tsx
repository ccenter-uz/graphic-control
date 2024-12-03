import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Step4ReasonForm } from "@widgets/step-4-reason-form";

import { ICheckbox } from "@shared/lib/types";
import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep4 = () => {
  const [textareaValue, setTextareaValue] = useState(
    (localStorage.getItem("description") as string) || "",
  );
  const [timeParams] = useSearchParams();
  const [isSubmitBtnActive, setIsSubmitBtnActive] = useState<boolean>(false);

  const handleConfirmClick = () => {
    localStorage.setItem("description", textareaValue);
    const time = localStorage.getItem("workingHours");
    const offDays = localStorage.getItem("offDays");
    const daysOfMonth = localStorage.getItem("daysOfMonthAtStep3");

    const filteredDaysOfMonth = JSON.parse(daysOfMonth as string).filter(
      (item: ICheckbox) => item?.id <= 31,
    );

    const data = [
      {
        time,
        offDays: JSON.parse(offDays as string),
        daysOfMonth: filteredDaysOfMonth,
        description: textareaValue,
      },
    ];
  };
  return (
    <div>
      <Step4ReasonForm
        className="my-2"
        textareaValue={textareaValue}
        setTextareaValue={setTextareaValue}
        setIsSubmitBtnActive={setIsSubmitBtnActive}
      />
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link
        to={`/new-preference/steps/4?${timeParams}`}
        className={`pointer-events-none ${
          isSubmitBtnActive && "pointer-events-auto"
        }`}
      >
        <BaseButton
          isDisabled={!isSubmitBtnActive}
          onClick={handleConfirmClick}
        >
          Подтвердить
        </BaseButton>
      </Link>
    </div>
  );
};
