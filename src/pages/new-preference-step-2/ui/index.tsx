import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import {
  getTargetWeek,
  monthToWeeks,
  switchOffDays,
  getExchangeableItem,
  generateEditableCalendarDays,
  generateOffDays,
} from "@shared/lib/helpers";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseButton from "@shared/ui/base-button";
import Checkbox from "@shared/ui/checkbox";
import WorkingHours from "@shared/ui/working-hours";

interface ICheckbox {
  id: number;
  isWorkDay: boolean;
  isOrder: boolean;
  isNight: boolean;
  isHoliday: boolean;
  isToday: boolean;
  isCheckable: boolean;
  shouldBeOffday: boolean;
  label: number;
}

const weekdayNameInRussian = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MIDDLE_OF_MONTH_INDEX = 15;
const FIRST_DAY_OF_WEEK_INDEX = 0;
const LAST_DAY_OF_WEEK_INDEX = 7;
const OFFSET_OF_MONTH_INDEX = 32;
const THIRD_PAGE_PATH = "/new-preference/steps/3";

export const NewPreferenceStep2 = () => {
  const [timeParams] = useSearchParams();
  const [cloneData, setCloneData] = useState<ICheckbox[]>([]);
  const [isBtnsActive, setIsBtnsActive] = useState<boolean>(false);
  const [isResetState, setIsResetState] = useState<boolean>(false);
  const { offDays } = useContext(NewPreferenceContext) || {};
  const { daysOfMonth, setDaysOfMonth } =
    useContext(NewPreferenceContext) ?? {};
  const token = localStorage.getItem("GCToken") as string;
  const url =
    "https://api.graphic.ccenter.uz/api/v1/agents/data-months?year_and_month=";
  const [amountDaysOfLastMonth, setAmountDaysOfLastMonth] = useState<number>(2);
  const [amountDaysOfCurrentMonth, setAmountDaysOfCurrentMonth] =
    useState<number>(31);
  const [shouldBeOffday, setShouldBeOffday] = useState<number>(3);

  useEffect(() => {
    axios
      .get(url + "2024%2F11", {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.OK) {
          const data = res.data.months;
          setAmountDaysOfLastMonth(+data.straight);
          setAmountDaysOfCurrentMonth(+data.days_count);
          setShouldBeOffday(6 - Number(data.straight));
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedDaysOfMonthAtStep3 = localStorage.getItem("daysOfMonthAtStep3");
    if (storedDaysOfMonthAtStep3 !== null) {
      localStorage.removeItem("daysOfMonthAtStep3");
    }
  }, []);

  useEffect(() => {
    const storedDaysArray = localStorage.getItem("daysOfMonthAtStep2");
    const daysArray: ICheckbox[] = storedDaysArray
      ? generateEditableCalendarDays(
          JSON.parse(storedDaysArray).length,
          amountDaysOfLastMonth,
        )
      : generateEditableCalendarDays(
          amountDaysOfCurrentMonth,
          amountDaysOfLastMonth,
        );

    const weeks = monthToWeeks(daysArray);
    const [firstOffDay, secondOffDay] = offDays ? switchOffDays(offDays) : [];

    !storedDaysArray
      ? generateOffDays(weeks as ICheckbox[][], firstOffDay, secondOffDay)
      : generateOffDays(weeks as ICheckbox[][], firstOffDay, secondOffDay);

    shouldBeOffday
      ? daysArray.find((item) => {
          if (item?.id == shouldBeOffday) {
            item.shouldBeOffday = true;
          }
        })
      : null;

    storedDaysArray ? setIsBtnsActive(true) : null;
    const storedCloneDaysArray = localStorage.getItem("cloneDaysArrayAtStep2");
    !storedCloneDaysArray
      ? localStorage.setItem("cloneDaysArrayAtStep2", JSON.stringify(daysArray))
      : setCloneData(daysArray);

    setDaysOfMonth?.(daysArray);
  }, [offDays, setDaysOfMonth]);

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
    localStorage.setItem("daysOfMonthAtStep2", JSON.stringify(daysOfMonth));
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h6 className="text-lg font-semibold">Октябрь 2024</h6>
        <button
          onClick={handleResetClick}
          className={`${isBtnsActive ? "text-[#007AFF]" : "text-[#ccc]"} `}
          disabled={!isBtnsActive}
        >
          Сбросить выбор
        </button>
      </div>
      <table className="my-5">
        <thead>
          <tr>
            {weekdayNameInRussian?.map((item) => (
              <th key={item} className="text-[#3C3C434D]">
                {item}
              </th>
            ))}
          </tr>
        </thead>
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
                        isHoliday={item.isHoliday}
                        isToday={item.isToday}
                        isCheckable={item.isCheckable}
                        shouldBeOffday={item.shouldBeOffday}
                        label={item.label}
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
      <Link
        to={`${THIRD_PAGE_PATH}?${timeParams}`}
        className={`${
          isBtnsActive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <BaseButton isDisabled={!isBtnsActive} onClick={handleConfirmClick}>
          Подтвердить
        </BaseButton>
      </Link>
    </div>
  );
};
