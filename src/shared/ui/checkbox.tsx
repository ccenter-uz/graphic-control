import { FC, useEffect, useState } from "react";

import {
  explanationPath,
  moonPath,
  sunPath,
} from "@shared/constants/svg-paths";

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
  isMustOffday?: boolean;
  className?: string;
  isReset: boolean;
};

const Checkbox: FC<Props> = ({
  isWorkDay = false,
  isOrder,
  isNight,
  isHoliday,
  isToday,
  label,
  isCheckable,
  isMustOffday,
  className = "",
  isReset,
}) => {
  const [isWorkDayState, setIsWorkDayState] = useState<boolean>(isWorkDay);

  useEffect(() => {
    setIsWorkDayState(isWorkDay);
  }, [isWorkDay, isReset]);

  const handleCheckboxChange = () => {
    setIsWorkDayState((prevState) => !prevState);
  };

  return (
    <label
      className={`${className} relative flex items-center justify-center w-11 h-11 text-xl rounded ${
        isOrder && isWorkDayState && isNight
          ? "bg-[#eaebec]"
          : isOrder && isWorkDayState && !isNight
          ? "bg-[#EBF4FD]"
          : isWorkDayState
          ? "bg-[#EBF4FD]"
          : !isWorkDayState
          ? "bg-[#fff]"
          : ""
      } ${
        isHoliday
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
      {(isOrder && isWorkDayState) || isMustOffday ? (
        <SvgIcon
          path={isMustOffday ? explanationPath : isNight ? moonPath : sunPath}
          color={isMustOffday ? "#555" : isNight ? "" : "#007AFF"}
          width={18}
          height={18}
          className="w-3 h-3 absolute right-0.5 top-0.5"
        />
      ) : (
        ""
      )}
      <input
        id={label?.toString()}
        type="checkbox"
        checked={isWorkDayState}
        onChange={handleCheckboxChange}
        className={`${isWorkDayState} ${
          !isCheckable ? "cursor-not-allowed" : "cursor-pointer"
        } absolute opacity-0`}
        disabled={!isCheckable}
      />
    </label>
  );
};

export default Checkbox;
