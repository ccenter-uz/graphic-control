import { FC } from "react";

type Props = {
  title: string;
  name: string;
  isChecked?: boolean;
  isDisabled?: boolean;
};

const WeekendCheckbox: FC<Props> = ({ title, name, isChecked, isDisabled }) => {
  return (
    <label className="text-[#64748B] text-sm flex items-center gap-2">
      <input
        readOnly
        type="checkbox"
        name={name}
        checked={isChecked}
        disabled={isDisabled}
      />
      {title}
    </label>
  );
};

export default WeekendCheckbox;
