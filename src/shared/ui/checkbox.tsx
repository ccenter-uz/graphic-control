import { FC, useEffect, useState } from "react";

import { moonPath, sunPath } from "@shared/constants/svg-paths";

import SvgIcon from "./svg-icon";

type Props = {
  id: number;
  isWorkDay?: boolean;
  isOrder?: boolean;
  isNight?: boolean;
  isHoliday?: boolean;
  isToday?: boolean;
  label?: number;
  isCheckable?: boolean;
  isAtWork: boolean;
  className?: string;
  isReset: boolean;
};

const Checkbox: FC<Props> = ({
  id,
  isWorkDay = false,
  isOrder,
  isNight,
  isHoliday,
  isToday,
  label,
  isCheckable,
  isAtWork,
  className = "",
  isReset,
}) => {
  const [isWorkDayState, setIsWorkDayState] = useState<boolean>(isWorkDay);

  useEffect(() => {
    setIsWorkDayState(isWorkDay);
  }, [isWorkDay, isReset]);

  const handleCheckboxChange = () => {
    setIsWorkDayState((prev) => !prev);
  };

  return (
    <label
      className={`${className} relative flex items-center justify-center sm:w-11 sm:h-11 xs:w-10 xs:h-10 w-9 h-9 text-xl rounded ${
        isAtWork
          ? "bg-[#faf6e2]"
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
        isAtWork
          ? "text-[#D9B903]"
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
      {isOrder && isWorkDayState ? (
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
        id={id?.toString()}
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
