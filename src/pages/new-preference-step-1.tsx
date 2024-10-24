import { useState } from "react";

import { SelectWeekendDays } from "@widgets/select-weekend-days";

const NewPreferenceStep1 = () => {
  const [validation, setValidation] = useState({
    isError: false,
    isSuccess: false,
  });

  return <SelectWeekendDays setValidation={setValidation} />;
};

export default NewPreferenceStep1;
