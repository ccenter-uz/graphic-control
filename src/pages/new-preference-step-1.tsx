import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { SelectWeekendDays } from "@widgets/select-weekend-days";

import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

const NewPreferenceStep1 = () => {
  const [validation, setValidation] = useState({
    isError: false,
    isSuccess: false,
  });
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <SelectWeekendDays setValidation={setValidation} />
      <WorkingHours hours={id} />
      <Link
        to={`/new-preference/${id}/step-2`}
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
