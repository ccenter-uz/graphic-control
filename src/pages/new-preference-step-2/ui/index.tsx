import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { getExchangeableItem } from "@shared/lib/getExchangeableItem";
import { getTargetWeek } from "@shared/lib/getTargetId";
import { monthToWeeks } from "@shared/lib/monthToWeeks";
import { switchOffDays } from "@shared/lib/switchOffDays";
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
  isMustOffday: boolean;
  label: number;
}

export const NewPreferenceStep2 = () => {
  const [timeParams] = useSearchParams();
  const [data, setData] = useState<ICheckbox[]>([]);
  const [cloneData, setCloneData] = useState<ICheckbox[]>([]);
  const [isResetBtnActive, setIsResetBtnActive] = useState<boolean>(false);
  const [isResetState, setIsResetState] = useState<boolean>(false);
  const { offDays } = useContext(NewPreferenceContext) || {};
  const daysOfLastMonth = 2;
  const endDayOfLastMonth = 31;
  const amountDaysOfCurrentMonth = 31;
  const whichDayIsMustOffday = 3;

  useEffect(() => {
    const daysArray: ICheckbox[] = [];
    for (
      let i = endDayOfLastMonth - (daysOfLastMonth - 1);
      i <= endDayOfLastMonth;
      i++
    ) {
      daysArray.push({
        id: i + 32,
        isWorkDay: false,
        isOrder: false,
        isNight: false,
        isHoliday: false,
        isToday: false,
        isCheckable: false,
        isMustOffday: false,
        label: i,
      });
    }
    for (let i = 1; i <= amountDaysOfCurrentMonth; i++) {
      daysArray.push({
        id: i,
        isWorkDay: true,
        isOrder: false,
        isNight: false,
        isHoliday: false,
        isToday: false,
        isCheckable: true,
        isMustOffday: false,
        label: i,
      });
    }

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

    whichDayIsMustOffday
      ? daysArray.find((item) => {
          if (item?.id == whichDayIsMustOffday) {
            item.isMustOffday = true;
          }
        })
      : null;

    setData(daysArray);
    setCloneData(daysArray);
  }, [offDays]);

  const handleTrChange = (e: React.ChangeEvent<HTMLTableRowElement>) => {
    setIsResetBtnActive(true);
    const targetId = +e?.target?.id;
    getTargetWeek(targetId, data);
    const targetWeek = getTargetWeek(targetId, data)?.filter(
      (item) => item?.id < 32,
    );
    const nextWeek = getTargetWeek(targetId + 7, data);
    const prevWeek = getTargetWeek(targetId - 7, data);
    const indexOfTargetDay = targetWeek?.findIndex(
      (item) => item?.id == targetId,
    );

    const exchangeableItem = getExchangeableItem(
      targetWeek ? targetWeek : [],
      indexOfTargetDay ? indexOfTargetDay : 0,
    );

    let valueFromTargetWeek;
    if (exchangeableItem === false) {
      if (targetId < 15) {
        valueFromTargetWeek = getExchangeableItem(nextWeek ? nextWeek : [], 0);
      } else {
        valueFromTargetWeek = getExchangeableItem(prevWeek ? prevWeek : [], 7);
      }
    } else {
      valueFromTargetWeek = getExchangeableItem(
        targetWeek ? targetWeek : [],
        indexOfTargetDay ? indexOfTargetDay : 0,
      );
    }

    if (valueFromTargetWeek && typeof valueFromTargetWeek !== "boolean") {
      const updatedData = data.map((item) =>
        item.id === valueFromTargetWeek.id
          ? { ...item, isWorkDay: true, isCheckable: false }
          : { ...item, isCheckable: false },
      );

      setData(updatedData);
    }
  };
  const handleResetClick = () => {
    console.log(cloneData);
    setData(cloneData);
    setIsResetBtnActive(false);
    setIsResetState((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h6 className="text-lg font-semibold">Октябрь 2024</h6>
        <button
          onClick={handleResetClick}
          className={`${isResetBtnActive ? "text-[#007AFF]" : "text-[#ccc]"} `}
          disabled={!isResetBtnActive}
        >
          Сбросить выбор
        </button>
      </div>
      <table className="my-5">
        <thead>
          <tr>
            <th className="text-[#3C3C434D]">ПН</th>
            <th className="text-[#3C3C434D]">BT</th>
            <th className="text-[#3C3C434D]">СР</th>
            <th className="text-[#3C3C434D]">ЧТ</th>
            <th className="text-[#3C3C434D]">ПТ</th>
            <th className="text-[#3C3C434D]">СБ</th>
            <th className="text-[#3C3C434D]">ВС</th>
          </tr>
        </thead>
        <tbody>
          {monthToWeeks(data).map((items, index) => {
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
                        isMustOffday={item.isMustOffday}
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
      <Link to={`/new-preference/steps/3?${timeParams}`}>
        <BaseButton>Подтвердить</BaseButton>
      </Link>
    </div>
  );
};
