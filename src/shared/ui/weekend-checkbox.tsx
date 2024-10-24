import { FC } from "react";

type Props = {
  title: string;
  name: string;
  isChecked?: boolean;
  isDisabled?: boolean;
};

const WeekendCheckbox: FC<Props> = ({ title, name, isChecked, isDisabled }) => {
  return (
    <label
      className="weekend-checkbox relative inline-flex items-center gap-2 cursor-pointer
"
    >
      <input
        readOnly
        type="checkbox"
        name={name}
        checked={isChecked}
        disabled={isDisabled}
        className="absolute opacity-0 w-0 h-0"
      />
      <span className="relative h-5 w-5 border border-[#64748b] rounded-[4px] inline-block"></span>
      {title}
    </label>
  );
};

export default WeekendCheckbox;
