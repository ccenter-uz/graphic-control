import React, { useEffect, useState } from "react";

import HeaderTitle from "@shared/ui/header-title";
import WeekendCheckbox from "@shared/ui/weekend-checkbox";

type Props = {
  setValidation: (validations: {
    isError: boolean;
    isSuccess: boolean;
  }) => void;
};

interface FormState {
  [key: string]: boolean;
}

const defaultFormState: FormState = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export const SelectWeekendDays: React.FC<Props> = ({ setValidation }) => {
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [isDisabled, setIsDisabled] = useState<FormState>(defaultFormState);

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const checkedDays = Object.values(formState).filter(
      (value) => value,
    ).length;

    setValidation({
      isError: checkedDays < 2,
      isSuccess: checkedDays >= 2,
    });

    setIsDisabled(() =>
      Object.keys(formState).reduce(
        (acc, key) => ({
          ...acc,
          [key]: formState[key] ? false : checkedDays >= 2,
        }),
        {} as FormState,
      ),
    );
  }, [formState, setValidation]);

  return (
    <>
      <HeaderTitle className="mt-5">
        Выберите 2 предпочитаемые выходные дни
      </HeaderTitle>
      <form
        onChange={handleFormChange}
        className="my-6 grid grid-rows-4 grid-flow-col gap-2"
      >
        {Object.keys(formState).map((day) => (
          <WeekendCheckbox
            key={day}
            title={day[0].toUpperCase() + day.slice(1)} // Capitalize first letter
            name={day}
            isChecked={formState[day]}
            isDisabled={isDisabled[day]}
          />
        ))}
      </form>
    </>
  );
};
