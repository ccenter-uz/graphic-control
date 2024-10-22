import { FC } from "react";

type Props = {
  title: string;
  name: string;
  isChecked?: boolean;
  isDisabled?: boolean;
};

const WeekendCheckbox: FC<Props> = ({ title, name, isChecked, isDisabled }) => {
  return (
    <label className="weekend-checkbox">
      <input
        readOnly
        type="checkbox"
        name={name}
        checked={isChecked}
        disabled={isDisabled}
      />
      <span></span>
      {title}
    </label>
  );
};

export default WeekendCheckbox;
