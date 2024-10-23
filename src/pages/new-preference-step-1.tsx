import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { SelectWeekendDays } from "@widgets/select-weekend-days";

import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

const NewPreferenceStep1 = () => {
  const [validation, setValidation] = useState({
    isError: false,
    isSuccess: false,
  });
  const [timeParams] = useSearchParams();

  return (
    <>
      <SelectWeekendDays setValidation={setValidation} />
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link
        to={`/new-preference/steps/2?${timeParams}`}
        className={`${validation.isError ? "pointer-events-none" : ""}`}
      >
        <BaseButton isDisabled={validation.isError ? true : false}>
          Подтвердить
        </BaseButton>
      </Link>
    </>
  );
};

export default NewPreferenceStep1;
