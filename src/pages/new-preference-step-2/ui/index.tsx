/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { schedulesApi } from "@shared/lib/baseApi";
import {
  getTargetWeek,
  monthToWeeks,
  switchOffDays,
  getExchangeableItem,
  generateEditableCalendarDays,
  generateOffDays,
  getLastDayOfCurrentMonth,
  generateCalendar,
} from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseButton from "@shared/ui/base-button";
import Checkbox from "@shared/ui/checkbox";
import { TableHead } from "@shared/ui/table-head";
import WorkingHours from "@shared/ui/working-hours";

const MIDDLE_OF_MONTH_INDEX = 15;
const FIRST_DAY_OF_WEEK_INDEX = 0;
const LAST_DAY_OF_WEEK_INDEX = 7;
const OFFSET_OF_MONTH_INDEX = 32;

export const NewPreferenceStep2 = () => {
  const offDaysFromStorage = localStorage.getItem("offDays");
  const offDays: string[] = Object.keys(
    JSON.parse(offDaysFromStorage || "{}"),
  ).filter((key) => JSON.parse(offDaysFromStorage || "{}")[key]);
  const [daysOfMonth, setDaysOfMonth] = useState<ICheckbox[]>([]);
  const token = localStorage.getItem("GCToken") as string;
  const storedAmountOfSteps = localStorage.getItem("amountOfHolidays");
  const THIRD_PAGE_PATH = !JSON.parse(storedAmountOfSteps as string)
    ? "/new-preference/steps/4"
    : "/new-preference/steps/3";

  const [timeParams] = useSearchParams();
  const [cloneData, setCloneData] = useState<ICheckbox[]>([]);
  const [isBtnsActive, setIsBtnsActive] = useState<boolean>(false);
  const [isResetState, setIsResetState] = useState<boolean>(false);
  const [holidays, setHolidays] = useState<string[]>([]);

  const month =
    new Date().getMonth() + 1 === 12 ? 1 : new Date().getMonth() + 1;
  const year =
    month === 1 ? new Date().getFullYear() + 1 : new Date().getFullYear();
  const firstDayOfCurrentMonth = +new Date(year, month, 1).getDate().toString();
  const lastDayOfCurrentMonth = +new Date(year, month, 0).getDate().toString();

  const { setBackLinkPath, setPageHeaderTitle, setSubHeaderInfoData } =
    useContext(NewPreferenceContext) || {};

  const getHolidays = async () => {
    try {
      const res = await schedulesApi.get(
        `${API_MAP.GET_HOLIDAYS_BY_MONTH}${month}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === HttpStatusCode.OK) {
        if (res.data.length) {
          const holidaysObj = JSON.parse(res.data[0].holidays);

          const holidaysArr: string[] = Object.values(holidaysObj).map(
            (holiday) => {
              if ((holiday as string).slice(0, 1) === "0") {
                return (holiday as string).slice(1, 2);
              } else {
                return (holiday as string).slice(0, 2);
              }
            },
          );
          setHolidays(holidaysArr);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHolidays();
  }, []);

  useEffect(() => {
    const storedDaysOfMonthAtStep3 = localStorage.getItem("daysOfMonthAtStep3");
    if (storedDaysOfMonthAtStep3 !== null) {
      localStorage.removeItem("daysOfMonthAtStep3");
    }
  }, []);

  useEffect(() => {
    setBackLinkPath?.("/new-preference/steps/1?" + timeParams);
    setPageHeaderTitle?.(
      "Выберите один рабочий день на замену одного выходного дня",
    );
    setSubHeaderInfoData?.([
      {
        id: 1,
        title: "Календарные дни",
        value: getLastDayOfCurrentMonth(),
      },
      {
        id: 2,
        title: "Кол-во произволных дней",
        value: "1",
      },
    ]);
  }, []);

  useEffect(() => {
    const storedDaysArray = localStorage.getItem("daysOfMonthAtStep2");

    let daysArray: ICheckbox[] = storedDaysArray
      ? generateEditableCalendarDays(
          JSON.parse(storedDaysArray).length,
          lastDayOfCurrentMonth,
        )
      : generateCalendar(
          year,
          month,
          firstDayOfCurrentMonth,
          lastDayOfCurrentMonth,
        );

    const weeks = JSON.parse(JSON.stringify(monthToWeeks(daysArray)));
    const [firstOffDay, secondOffDay] = offDays ? switchOffDays(offDays) : [];

    if (!storedDaysArray) {
      const daysArrayWithOffDays = generateOffDays(
        JSON.parse(JSON.stringify(weeks)) as ICheckbox[][],
        firstOffDay,
        secondOffDay,
      );

      daysArray = daysArrayWithOffDays.flat();
    } else {
      daysArray = JSON.parse(storedDaysArray);
    }

    storedDaysArray ? setIsBtnsActive(true) : null;
    const storedCloneDaysArray = localStorage.getItem("cloneDaysArrayAtStep2");
    !storedCloneDaysArray
      ? localStorage.setItem("cloneDaysArrayAtStep2", JSON.stringify(daysArray))
      : setCloneData(daysArray);

    setDaysOfMonth?.(daysArray);
  }, [offDaysFromStorage, setDaysOfMonth]);

  const handleTrChange = (e: React.ChangeEvent<HTMLTableRowElement>) => {
    setIsBtnsActive(true);
    const targetId = +e?.target?.id;

    getTargetWeek(targetId, daysOfMonth as ICheckbox[]);
    const targetWeek = getTargetWeek(
      targetId,
      daysOfMonth as ICheckbox[],
    )?.filter((item) => item?.id < OFFSET_OF_MONTH_INDEX) as ICheckbox[];

    const nextWeek = getTargetWeek(
      targetId + LAST_DAY_OF_WEEK_INDEX,
      daysOfMonth as ICheckbox[],
    ) as ICheckbox[];

    const prevWeek = getTargetWeek(
      targetId - LAST_DAY_OF_WEEK_INDEX,
      daysOfMonth as ICheckbox[],
    ) as ICheckbox[];

    const indexOfTargetDay = targetWeek?.findIndex(
      (item) => item?.id == targetId,
    );

    const exchangeableItem = getExchangeableItem(
      targetWeek ? targetWeek : [],
      indexOfTargetDay ? indexOfTargetDay : 0,
    );

    let valueFromTargetWeek;
    if (exchangeableItem === false) {
      if (targetId < MIDDLE_OF_MONTH_INDEX) {
        valueFromTargetWeek = getExchangeableItem(
          nextWeek ? nextWeek : [],
          FIRST_DAY_OF_WEEK_INDEX,
        );
      } else {
        valueFromTargetWeek = getExchangeableItem(
          prevWeek ? prevWeek : [],
          LAST_DAY_OF_WEEK_INDEX,
        );
      }
    } else {
      valueFromTargetWeek = getExchangeableItem(
        targetWeek ? targetWeek : [],
        indexOfTargetDay ? indexOfTargetDay : 0,
      );
    }
    if (valueFromTargetWeek && typeof valueFromTargetWeek !== "boolean") {
      const updatedData = daysOfMonth?.map((item) =>
        item.id === valueFromTargetWeek.id
          ? {
              ...item,
              isWorkDay: true,
              isCheckable: false,
              systemSuggestsLikeWorkday: true,
            }
          : item?.id === targetId
          ? {
              ...item,
              isWorkDay: false,
              isCheckable: false,
              customOffday: true,
            }
          : { ...item, isCheckable: false },
      );
      setDaysOfMonth?.(updatedData as ICheckbox[]);
    }
  };

  const handleResetClick = () => {
    const storedCloneDaysArray = localStorage.getItem("cloneDaysArrayAtStep2");
    if (storedCloneDaysArray !== null) {
      setDaysOfMonth?.(JSON.parse(storedCloneDaysArray));
    } else {
      setDaysOfMonth?.(cloneData);
    }

    setIsBtnsActive(false);
    setIsResetState((prev) => !prev);
  };

  const handleConfirmClick = () => {
    const storedCloneDaysArray = localStorage.getItem("cloneDaysArrayAtStep2");
    const parsedCloneDaysArray = storedCloneDaysArray
      ? JSON.parse(storedCloneDaysArray)
      : [];
    if (daysOfMonth.length) {
      localStorage.setItem("daysOfMonthAtStep2", JSON.stringify(daysOfMonth));
    } else {
      localStorage.setItem("daysOfMonthAtStep2", parsedCloneDaysArray);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h6 className="text-lg font-semibold">
          {months[month - 1].title} {year}
        </h6>
        <button
          onClick={handleResetClick}
          className={`${isBtnsActive ? "text-[#007AFF]" : "text-[#ccc]"} `}
          disabled={!isBtnsActive}
        >
          Сбросить выбор
        </button>
      </div>
      <table className="my-5">
        <TableHead />
        <tbody>
          {monthToWeeks(daysOfMonth ? daysOfMonth : []).map((items, index) => {
            return (
              <tr key={index} onChange={handleTrChange}>
                {items?.map((item) => {
                  return (
                    <td key={item?.id} className="p-1">
                      <Checkbox
                        id={item?.id}
                        isWorkDay={item.isWorkDay}
                        isOrder={item.isOrder}
                        isNight={item.isNight}
                        isHoliday={
                          holidays
                            ? holidays?.includes(String(item?.id))
                            : item.isHoliday
                        }
                        isToday={item.isToday}
                        isCheckable={item.isCheckable}
                        label={item.label}
                        isAtWork={item.isAtWork}
                        isReset={isResetState}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link to={`${THIRD_PAGE_PATH}?${timeParams}`}>
        <BaseButton onClick={handleConfirmClick}>Далее</BaseButton>
      </Link>
    </div>
  );
};
