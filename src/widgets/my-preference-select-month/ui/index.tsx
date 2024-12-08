/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { IMonth, months } from "@shared/constants/months";
import { arrowLeftPath, arrowRightPath } from "@shared/constants/svg-paths";
import { baseApi } from "@shared/lib/baseApi";
import { HttpStatusCode } from "@shared/model/httpStatus";
import SvgIcon from "@shared/ui/svg-icon";

interface IPreference {
  id: string;
  create_data: string;
  requested_date: string;
}

export const MyPreferenceSelectMonth = () => {
  const token = localStorage.getItem("GCToken") || "";
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [preferences, setPreferences] = useState<IPreference[]>([]);
  const [cloneMonths, setCloneMonths] = useState<IMonth[]>(months);
  const [isBtnsActive, setIsBtnsActive] = useState({
    increment: true,
    decrement: true,
  });
  const [yearsHaveData, setYearsHaveData] = useState<number[]>([]);

  const getYearsHaveData = useCallback(async () => {
    try {
      const res = await baseApi.get(`${API_MAP.GET_ALL_PREFERENCES}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === HttpStatusCode.OK) {
        const data = res.data.result;
        const yearsHaveData: number[] = [];
        data.forEach((item: IPreference) => {
          if (
            !yearsHaveData.includes(Number(item.requested_date.split("/")[0]))
          ) {
            yearsHaveData.push(Number(item.requested_date.split("/")[0]));
          }
        });
        setYearsHaveData(yearsHaveData);
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    }
  }, []);

  const fetchPreferences = useCallback(async () => {
    try {
      const res = await baseApi.get(
        `${API_MAP.GET_PREFERENCES_BY_YEAR}${currentYear}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === HttpStatusCode.OK) {
        setPreferences(res.data.result);
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    }
  }, [currentYear, token]);

  const updateMonthAvailability = useCallback(() => {
    const updatedMonths = months.map((month) => {
      const matchingPreference = preferences.find(
        (pref) =>
          month.orderedNumber === Number(pref.requested_date.split("/")[1]),
      );

      return {
        ...month,
        isAvailable: !!matchingPreference,
        link: matchingPreference?.id || "",
      };
    });

    setCloneMonths(updatedMonths);
  }, [preferences]);

  const updateButtonStates = useCallback(() => {
    const minYear = yearsHaveData[0];
    const maxYear = yearsHaveData[yearsHaveData.length - 1];

    setIsBtnsActive({
      decrement: currentYear > minYear,
      increment: currentYear < maxYear,
    });
  }, [currentYear, yearsHaveData]);

  useEffect(() => {
    getYearsHaveData();
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  useEffect(() => {
    updateMonthAvailability();
  }, [preferences, updateMonthAvailability]);

  useEffect(() => {
    updateButtonStates();
  }, [currentYear, updateButtonStates]);

  const handlePrevYearClick = () => setCurrentYear((prev) => prev - 1);
  const handleNextYearClick = () => setCurrentYear((prev) => prev + 1);
  return (
    <div className="mt-10 border rounded-md">
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
              to={`single-preference/${month.link}`}
              className={`${
                !month.isAvailable
                  ? "bg-[#fff] text-[#64748B] cursor-not-allowed pointer-events-none"
                  : ""
              } flex items-center justify-center py-2.5 rounded-md bg-[#F0F7FE] text-[#007AFF] active:bg-[#e8ecfa]`}
            >
              За {month.title.slice(0, 3).toLocaleLowerCase()}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
