import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import {
  getTargetWeek,
  monthToWeeks,
  switchOffDays,
  getExchangeableItem,
} from "@shared/lib/helpers";
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
  const daysOfLastMonth = 2;
  const amountDaysOfCurrentMonth = 31;
  const shouldBeOffday = 3;

  useEffect(() => {
    const daysArray: ICheckbox[] = Array.from(
      { length: amountDaysOfCurrentMonth + daysOfLastMonth },
      (_, i) => ({
        id: i < daysOfLastMonth ? i + 32 : i - (daysOfLastMonth - 1),
        isWorkDay: i < daysOfLastMonth ? false : true,
        isOrder: false,
        isNight: false,
        isHoliday: false,
        isToday: false,
        isCheckable: i < daysOfLastMonth ? false : true,
        shouldBeOffday: false,
        label:
          i < daysOfLastMonth
            ? i + 32 - daysOfLastMonth
            : i - (daysOfLastMonth - 1),
      }),
    );

    const weeks = monthToWeeks(daysArray);
    const [firstOffDay, secondOffDay] = offDays ? switchOffDays(offDays) : [];

    weeks.forEach((week) => {
      if (week[firstOffDay]) {
        week[firstOffDay].isWorkDay = false;
        week[firstOffDay].isCheckable = false;
      }

      if (week[secondOffDay]) {
        week[secondOffDay].isWorkDay = false;
        week[secondOffDay].isCheckable = false;
      }
    });

    shouldBeOffday
      ? daysArray.find((item) => {
          if (item?.id == shouldBeOffday) {
            item.shouldBeOffday = true;
          }
        })
      : null;

    setDaysOfMonth?.(daysArray);
    setCloneData(daysArray);
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
          ? { ...item, isWorkDay: true, isCheckable: false }
          : item?.id === targetId
          ? { ...item, isWorkDay: false, isCheckable: false }
          : { ...item, isCheckable: false },
      );

      setDaysOfMonth?.(updatedData as ICheckbox[]);
    }
  };
  const handleResetClick = () => {
    setDaysOfMonth?.(cloneData);
    setIsBtnsActive(false);
    setIsResetState((prev) => !prev);
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
        <BaseButton isDisabled={!isBtnsActive}>Подтвердить</BaseButton>
      </Link>
    </div>
  );
};
