import { FC, useState } from "react";

import { moonPath, sunPath } from "@shared/constants/svg-paths";

import SvgIcon from "./svg-icon";

type Props = {
  isWorkDay?: boolean;
  isOrder?: boolean;
  isNight?: boolean;
  isHoliday?: boolean;
  isToday?: boolean;
  label?: number;
  isCheckable?: boolean;
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
  const [isWorkDayState, setIsWorkDayState] = useState<boolean>(
    isWorkDay || false,
  );

  const handleChange = () => {
    setIsWorkDayState((prevState) => !prevState);
  };

  return (
    <label
      className={`relative flex items-center justify-center w-11 h-11 text-xl rounded ${
        isTrueOption
          ? "bg-green-200"
          : isOrder && isWorkDayState && isNight
          ? "bg-[#eaebec]"
          : isOrder && isWorkDayState && !isNight
          ? "bg-[#EBF4FD]"
          : isWorkDayState
          ? "bg-[#EBF4FD]"
          : !isWorkDayState
          ? "bg-[#fff]"
          : ""
      } ${
        isTrueOption
          ? "text-green-500"
          : isHoliday
          ? "text-[#C43D46]"
          : isOrder && isWorkDayState && isNight
          ? " text-[#64748B]"
          : isOrder && isWorkDayState && !isNight
          ? " text-[#59A2F0]"
          : isWorkDayState
          ? "text-[#59A2F0]"
          : !isWorkDayState
          ? "text-[#ccc]"
          : ""
      } ${isToday ? "font-bold" : ""} ${
        !isCheckable ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {label}
      {isOrder && isWorkDay ? (
        <SvgIcon
          path={isNight ? moonPath : sunPath}
          color={isNight ? "" : "#007AFF"}
          width={20}
          height={20}
          className="w-3 h-3 absolute right-0.5 top-0.5"
        />
      ) : (
        ""
      )}
      <input
        type="checkbox"
        checked={isWorkDayState}
        onChange={handleChange}
        className={`${
          !isCheckable ? "cursor-not-allowed" : "cursor-pointer"
        } absolute opacity-0`}
        disabled={!isCheckable}
      />
    </label>
  );
};

export default Checkbox;
