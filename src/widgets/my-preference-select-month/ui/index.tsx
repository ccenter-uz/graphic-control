import { useEffect, useState } from "react";
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
  const token = localStorage.getItem("GCToken");
  const [currentYear, setCurrentYear] = useState(2024);
  const [preferences, setPreferences] = useState<IPreference[]>([]);
  const [isBtnsActive, setIsBtnsActive] = useState({
    increment: true,
    decrement: true,
  });
  const [cloneMonths, setCloneMonths] = useState(months);
  const [yearsHaveData, setYearsHaveData] = useState<number[]>([]);

  useEffect(() => {
    const yearsHaveDataClone = [];
    for (let i = currentYear - 1; i <= currentYear + 1; i++) {
      yearsHaveDataClone.push(i);
    }
    setYearsHaveData(yearsHaveDataClone);
  }, [currentYear]);

  useEffect(() => {
    baseApi
      .get(API_MAP.GET_PREFERENCES_BY_YEAR + `${currentYear}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === HttpStatusCode.OK) {
          setPreferences(res.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentYear, token]);

  useEffect(() => {
    const monthC = JSON.parse(JSON.stringify(months));

    const filteredMoths = monthC.map((month: IMonth) => {
      preferences?.forEach((item: IPreference) => {
        if (month.orderedNumber === +item?.requested_date.split("/")[1]) {
          month.isAvailable = true;
          month.link = item.id;
        }
      });
      return month;
    });

    setCloneMonths(filteredMoths);
  }, [preferences]);

  const handlePrevYearClick = () => {
    setCurrentYear((prev) => prev - 1);
  };

  const handleNextYearClick = () => {
    setCurrentYear((prev) => prev + 1);
  };

  useEffect(() => {
    const minYear = yearsHaveData[0];
    const maxYear = yearsHaveData[yearsHaveData.length - 1];
    if (currentYear > minYear) {
      setIsBtnsActive((prev) => ({ ...prev, decrement: true }));
    } else {
      setIsBtnsActive((prev) => ({ ...prev, decrement: false }));
    }
    if (currentYear < maxYear) {
      setIsBtnsActive((prev) => ({ ...prev, increment: true }));
    } else {
      setIsBtnsActive((prev) => ({ ...prev, increment: false }));
    }
  }, [currentYear, preferences, yearsHaveData]);

  return (
    <div className="mt-10 border rounded-md">
      <div className="flex items-center justify-between mx-2">
        <button
          onClick={handlePrevYearClick}
          className={`${isBtnsActive.decrement ? "" : "invisible"}`}
        >
          <SvgIcon path={arrowLeftPath} width={18} height={18} />
        </button>
        <h6 className="text-sm text-center font-semibold text-[#007AFF] my-3">
          {currentYear}
        </h6>

        <button
          onClick={handleNextYearClick}
          className={`${isBtnsActive.increment ? "" : "invisible"}`}
        >
          <SvgIcon path={arrowRightPath} width={18} height={18} />
        </button>
      </div>
      <hr />
      <ol className="grid grid-cols-4 gap-1 mt-1">
        {cloneMonths.map((month) => {
          return (
            <li key={month.id}>
              <Link
                to={`single-preference/${month?.link}`}
                className={`${
                  !month.isAvailable
                    ? "bg-[#fff] text-[#64748B] cursor-not-allowed pointer-events-none"
                    : ""
                } flex items-center justify-center py-2.5 rounded-md bg-[#F0F7FE] text-[#007AFF] active:bg-[#e8ecfa]`}
              >
                {month.title.slice(0, 3)}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
