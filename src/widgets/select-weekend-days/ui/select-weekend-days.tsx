import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { IWeekDays } from "@shared/lib/types";
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

const weekdaysInRussian: { [key: string]: string } = {
  monday: t("widgets.select_weekend_days.monday"),
  tuesday: t("widgets.select_weekend_days.tuesday"),
  wednesday: t("widgets.select_weekend_days.wednesday"),
  thursday: t("widgets.select_weekend_days.thursday"),
  friday: t("widgets.select_weekend_days.friday"),
  saturday: t("widgets.select_weekend_days.saturday"),
  sunday: t("widgets.select_weekend_days.sunday"),
};

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
      <p className="mt-5 text-sm text-[#64748B]">
        {t("widgets.select_weekend_days.title")}
      </p>
      <form
        onChange={handleFormChange}
        className="my-6 grid grid-rows-4 grid-flow-col gap-2"
      >
        {Object.keys(formState).map((day) => (
          <WeekendCheckbox
            key={day}
            title={weekdaysInRussian[`${day[0] + day.slice(1).toLowerCase()}`]}
            name={day}
            isChecked={formState[day]}
            isDisabled={isDisabled[day]}
          />
        ))}
      </form>
    </div>
  );
};
