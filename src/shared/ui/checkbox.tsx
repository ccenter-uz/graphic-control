import { ChangeEvent, FC, useState } from "react";

import moonImg from "../../../assets/images/moon.svg";
import sunImg from "../../../assets/images/sun.svg";

type Props = {
  isWorkDay: boolean;
  isOrder: boolean;
  isNight?: boolean;
  isHoliday: boolean;
  isToday: boolean;
  label: number;
  isCheckable: boolean;
  isTrueOption?: boolean;
};

const Checkbox: FC<Props> = ({
  isWorkDay,
  isOrder,
  isNight,
  isHoliday,
  isToday,
  label,
  isCheckable,
  isTrueOption,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setIsChecked((prevState) => !prevState);
  };

  return (
    <label
      className={`relative flex items-center justify-center w-11 h-11 text-xl cursor-pointer rounded ${
        isTrueOption
          ? "bg-green-200"
          : isOrder && isWorkDay && isNight
          ? "bg-[#eaebec]"
          : isOrder && isWorkDay && !isNight
          ? "bg-[#EBF4FD]"
          : isWorkDay
          ? "bg-[#EBF4FD]"
          : !isWorkDay
          ? "bg-[#fff]"
          : ""
      } ${
        isTrueOption
          ? "text-green-500"
          : isHoliday
          ? "text-[#C43D46]"
          : isOrder && isWorkDay && isNight
          ? " text-[#64748B]"
          : isOrder && isWorkDay && !isNight
          ? " text-[#59A2F0]"
          : isWorkDay
          ? "text-[#59A2F0]"
          : !isWorkDay
          ? "text-[#ccc]"
          : ""
      } ${isToday ? "font-bold" : ""}`}
    >
      {label}
      {isOrder && isWorkDay ? (
        <img
          src={isNight ? moonImg : sunImg}
          alt={isNight ? "moon image" : "sun image"}
          className="w-3 h-3 absolute right-0.5 top-0.5"
        />
      ) : (
        ""
      )}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="absolute opacity-0 cursor-pointer"
        value="false"
        disabled={isCheckable}
      />
    </label>
  );
};

export default Checkbox;
