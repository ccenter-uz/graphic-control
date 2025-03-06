/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { IMonth, months } from "@shared/constants/months";
import { arrowLeftPath, arrowRightPath } from "@shared/constants/svg-paths";
import { schedulesApi } from "@shared/lib/baseApi";
import { isTokenAvailable } from "@shared/lib/helpers";
import { HttpStatusCode } from "@shared/model/httpStatus";
import SvgIcon from "@shared/ui/svg-icon";

interface ISchedule {
  days_count: string;
  name: string;
  number: number;
  year: string;
}

export const SchedulesSelectMonth = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("GCToken") as string;
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [schedules, setSchedules] = useState([]);
  const [cloneMonths, setCloneMonths] = useState<IMonth[]>(months);
  const [isBtnsActive, setIsBtnsActive] = useState({
    increment: true,
    decrement: true,
  });
  const [yearsHaveData, setYearsHaveData] = useState<number[]>([]);

  const getYearsHaveData = useCallback(async () => {
    try {
      const res = await schedulesApi.get(`${API_MAP.GET_ALL_SCHEDULES}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === HttpStatusCode.OK) {
        const data = res.data.months;
        setSchedules(data);
        const yearsHaveDataArr: number[] = [];

        data.forEach((item: ISchedule) => {
          if (!yearsHaveDataArr.includes(Number(item.year))) {
            yearsHaveDataArr.push(Number(item.year));
          }
        });

        const sortedYearsHaveDataArr = yearsHaveDataArr.sort((a, b) => a - b);
        setYearsHaveData(sortedYearsHaveDataArr);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      !isTokenAvailable(error.status) ? navigate("/login") : null;
    }
  }, []);

  const updateMonthAvailability = useCallback(() => {
    const updatedMonths = months.map((month) => {
      const matchingPreference = schedules?.find(
        (pref: ISchedule) =>
          +pref.year == currentYear && month.orderedNumber === pref.number,
      ) as ISchedule | undefined;
      return {
        ...month,
        isAvailable: !!matchingPreference,
        date: matchingPreference?.year + "-" + matchingPreference?.number,
      };
    });
    setCloneMonths(updatedMonths);
  }, [schedules, currentYear]);

  const updateButtonStates = useCallback(() => {
    const minYear = yearsHaveData.length ? yearsHaveData[0] : currentYear + 1;
    const maxYear =
      yearsHaveData.length > 1
        ? yearsHaveData[yearsHaveData.length - 1]
        : currentYear - 1;

    setIsBtnsActive({
      decrement: currentYear > minYear,
      increment: currentYear < maxYear,
    });
  }, [currentYear, yearsHaveData]);

  useEffect(() => {
    getYearsHaveData();
  }, []);

  useEffect(() => {
    updateMonthAvailability();
  }, [schedules, updateMonthAvailability]);

  useEffect(() => {
    updateButtonStates();
  }, [currentYear, updateButtonStates]);

  const handlePrevYearClick = () => setCurrentYear((prev) => prev - 1);
  const handleNextYearClick = () => setCurrentYear((prev) => prev + 1);

  return (
    <div className="mt-4 border rounded-md">
      <div className="flex items-center justify-between mx-2">
        <button
          onClick={handlePrevYearClick}
          className={isBtnsActive.decrement ? "" : "invisible"}
        >
          <SvgIcon path={arrowLeftPath} width={18} height={18} />
        </button>
        <h6 className="text-sm text-center font-semibold text-[#007AFF] my-3">
          {currentYear}
        </h6>
        <button
          onClick={handleNextYearClick}
          className={isBtnsActive.increment ? "" : "invisible"}
        >
          <SvgIcon path={arrowRightPath} width={18} height={18} />
        </button>
      </div>
      <hr />
      <ol className="grid grid-cols-4 gap-1 mt-1">
        {cloneMonths.map((month) => (
          <li key={month.id}>
            <Link
              to={`single-schedule/${month.date}`}
              className={`${
                !month.isAvailable
                  ? "bg-[#fff] text-[#64748B] cursor-not-allowed pointer-events-none"
                  : ""
              } flex items-center justify-center py-2.5 rounded-md bg-[#F0F7FE] text-[#007AFF] active:bg-[#e8ecfa]`}
            >
              {month.title.slice(0, 3)}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
