import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { arrowLeftPath, arrowRightPath } from "@shared/constants/svg-paths";
import { baseApi } from "@shared/lib/baseApi";
import { HttpStatusCode } from "@shared/model/httpStatus";
import SvgIcon from "@shared/ui/svg-icon";

interface IPreference {
  id: string;
  create_data: string;
  requested_date: string;
}

interface IUpdatedPreference {
  year: number;
  data: IPreference[];
}

export const MyPreferenceSelectMonth = () => {
  const token = localStorage.getItem("GCToken");
  const [cloneMonths, setCloneMonths] = useState(months);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [preferences, setPreferences] = useState<IUpdatedPreference[]>([]);
  const [isBtnsActive, setIsBtnsActive] = useState({
    increment: true,
    decrement: true,
  });
  const resetMonths = cloneMonths.map((item) => ({
    ...item,
    isAvailable: false,
    link: "",
  }));

  useEffect(() => {
    baseApi
      .get(API_MAP.GET_ALL_PREFERENCES_BY_MONTH, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === HttpStatusCode.OK) {
          const data = res.data.result;
          const sortedData = data.sort(
            (a: IPreference, b: IPreference) =>
              +a.requested_date.slice(5) - +b.requested_date.slice(5),
          );

          const yearsHasData = [] as number[];
          const updatedData = [] as IUpdatedPreference[];

          sortedData.forEach((item: IPreference) => {
            if (!yearsHasData.includes(+item.requested_date.slice(0, 4)))
              yearsHasData.push(+item.requested_date.slice(0, 4));
          });
          const sortedYears = yearsHasData.sort((a, b) => a - b);
          sortedYears.forEach((year) => {
            updatedData.push({
              year,
              data: data.filter(
                (item: IPreference) =>
                  +item.requested_date.slice(0, 4) === year,
              ),
            });
          });
          setPreferences(updatedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    const currentIndex = preferences?.findIndex(
      (item: IUpdatedPreference) => item.year === currentYear,
    );
    cloneMonths.forEach((month) => {
      preferences[currentIndex]?.data?.forEach((item: IPreference) => {
        if (month.orderedNumber === +item?.requested_date.slice(5)) {
          month.isAvailable = true;
          month.link = item.id;
        }
      });
    });
  }, [preferences, currentYear, cloneMonths]);

  const handleDecrementYearClick = () => {
    setCloneMonths(resetMonths);
    preferences.find((item: IUpdatedPreference) => {
      if (item.year === currentYear - 1) {
        setCurrentYear(item.year);
      }
    });
  };
  const handleIncrementYearClick = () => {
    setCloneMonths(resetMonths);
    preferences.find((item: IUpdatedPreference) => {
      if (item.year === currentYear + 1) {
        setCurrentYear(item.year);
      }
    });
  };

  useEffect(() => {
    const minYear = preferences[0]?.year;
    const maxYear = preferences[preferences.length - 1]?.year;
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
  }, [currentYear, preferences]);

  return (
    <div className="mt-10 border rounded-md">
      <div className="flex items-center justify-between mx-2">
        <button
          onClick={handleDecrementYearClick}
          className={`${isBtnsActive.decrement ? "" : "invisible"}`}
        >
          <SvgIcon path={arrowLeftPath} width={18} height={18} />
        </button>

        <h6 className="text-sm text-center font-semibold text-[#007AFF] my-3">
          {currentYear}
        </h6>

        <button
          onClick={handleIncrementYearClick}
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
                to={`single-preference/${month.link}`}
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
