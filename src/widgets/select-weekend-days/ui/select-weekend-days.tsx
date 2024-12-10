import React, { useContext, useEffect, useState } from "react";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { IWeekDays } from "@shared/lib/types";
import HeaderTitle from "@shared/ui/header-title";
import WeekendCheckbox from "@shared/ui/weekend-checkbox";

interface IFormState {
  [key: string]: boolean;
}

interface Props {
  defaultFormState: IFormState;
  formState: IWeekDays;
  setFormState: React.Dispatch<React.SetStateAction<IWeekDays>>;
  setIsSubmitBtnAble: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectWeekendDays: React.FC<Props> = ({
  defaultFormState,
  formState,
  setFormState,
  setIsSubmitBtnAble,
}) => {
  const [isDisabled, setIsDisabled] = useState<IFormState>(defaultFormState);
  const { setOffDays } = useContext(NewPreferenceContext) || {};

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, checked } = event.target;
    console.log(formState, "formState");

    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const checkedDays = Object.values(formState).filter(
      (value) => value,
    ).length;

    setIsDisabled(() =>
      Object.keys(formState).reduce(
        (acc, key) => ({
          ...acc,
          [key]: formState[key] ? false : checkedDays >= 2,
        }),
        {},
      ),
    );

    setOffDays &&
      setOffDays(Object.keys(formState).filter((key) => formState[key]));
    const selectedOffdaysValues = Object.values(formState).filter(
      (value) => value,
    );
    selectedOffdaysValues.length >= 2
      ? setIsSubmitBtnAble(true)
      : setIsSubmitBtnAble(false);
  }, [formState, setIsSubmitBtnAble, setOffDays]);

  return (
    <div>
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
            title={day[0].toUpperCase() + day.slice(1)}
            name={day}
            isChecked={formState[day]}
            isDisabled={isDisabled[day]}
          />
        ))}
      </form>
    </div>
  );
};
