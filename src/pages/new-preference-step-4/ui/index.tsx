import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Step4ReasonForm } from "@widgets/step-4-reason-form";

import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep4 = () => {
  const [timeParams] = useSearchParams();
  const [isSubmitBtnActive, setIsSubmitBtnActive] = useState<boolean>(false);
  return (
    <div>
      <Step4ReasonForm
        className="my-2"
        setIsSubmitBtnActive={setIsSubmitBtnActive}
      />
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link
        to={`/new-preference/steps/4?${timeParams}`}
        className={`pointer-events-none ${
          isSubmitBtnActive && "pointer-events-auto"
        }`}
      >
        <BaseButton isDisabled={!isSubmitBtnActive}>Подтвердить</BaseButton>
      </Link>
    </div>
  );
};
