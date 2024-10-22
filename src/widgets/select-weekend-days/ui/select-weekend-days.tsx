import React, { useEffect, useState } from "react";

import HeaderTitle from "@shared/ui/header-title";
import WeekendCheckbox from "@shared/ui/weekend-checkbox";

interface FormState {
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  checkbox4: boolean;
  checkbox5: boolean;
  checkbox6: boolean;
  checkbox7: boolean;
}

export const SelectWeekendDays: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
  });
  const [isDisabled, setIsDisabled] = useState<FormState>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, checked } = event.target;
    setFormState({
      ...formState,
      [name]: checked,
    });
  };

  useEffect(() => {
    const keys = Object.keys(formState);
    const values = Object.values(formState);
    const abledValuesLength = values.filter((v) => v).length;

    if (abledValuesLength === 2) {
      const checkIsTwoCheckboxChecked = Object.values(formState).reduce(
        (acc, value, index) => ({
          ...acc,
          [keys[index]]: !value,
        }),
        {},
      );
      setIsDisabled(checkIsTwoCheckboxChecked);
    } else {
      setIsDisabled({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        checkbox7: false,
      });
    }
  }, [formState]);

  return (
    <>
      <HeaderTitle className="text-center mt-6">
        Выберите предпочитаемые выходные дни
      </HeaderTitle>
      <form
        onChange={handleFormChange}
        className="my-6 grid grid-rows-4 grid-flow-col gap-2"
      >
        <WeekendCheckbox
          title={"Понедельник"}
          name="checkbox1"
          isChecked={formState.checkbox1}
          isDisabled={isDisabled.checkbox1}
        />
        <WeekendCheckbox
          title={"Вторник"}
          name="checkbox2"
          isChecked={formState.checkbox2}
          isDisabled={isDisabled.checkbox2}
        />
        <WeekendCheckbox
          title={"Среда"}
          name="checkbox3"
          isChecked={formState.checkbox3}
          isDisabled={isDisabled.checkbox3}
        />
        <WeekendCheckbox
          title={"Четверг"}
          name="checkbox4"
          isChecked={formState.checkbox4}
          isDisabled={isDisabled.checkbox4}
        />
        <WeekendCheckbox
          title={"Пятница"}
          name="checkbox5"
          isChecked={formState.checkbox5}
          isDisabled={isDisabled.checkbox5}
        />
        <WeekendCheckbox
          title={"Суббота"}
          name="checkbox6"
          isChecked={formState.checkbox6}
          isDisabled={isDisabled.checkbox6}
        />
        <WeekendCheckbox
          title={"Воскресенье"}
          name="checkbox7"
          isChecked={formState.checkbox7}
          isDisabled={isDisabled.checkbox7}
        />
      </form>
    </>
  );
};
