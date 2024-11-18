import { FC, useEffect, useState } from "react";

import { asteriskPath, moonPath, sunPath } from "@shared/constants/svg-paths";

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
  shouldBeOffday?: boolean;
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
  shouldBeOffday,
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
      {(isOrder && isWorkDayState) || shouldBeOffday ? (
        <SvgIcon
          path={shouldBeOffday ? asteriskPath : isNight ? moonPath : sunPath}
          color={shouldBeOffday ? "#C43D46" : isNight ? "" : "#007AFF"}
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
