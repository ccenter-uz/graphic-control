import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { monthToWeeks } from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import BaseButton from "@shared/ui/base-button";
import Checkbox from "@shared/ui/checkbox";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep3 = () => {
  const { daysOfMonth, setDaysOfMonth } =
    useContext(NewPreferenceContext) ?? {};
  const [cloneData, setCloneData] = useState<ICheckbox[]>([]);
  const [timeParams] = useSearchParams();
  const [targetId, setTargetId] = useState<number>();
  const [amountHolidays, setAmountHolidays] = useState<number>(2);
  const [isResetState, setIsResetState] = useState<boolean>(false);
  const [isResetBtnActive, setIsResetBtnActive] = useState<boolean>(false);
  const [isSubmitBtnActive, setIsSubmitBtnActive] = useState<boolean>(false);

  const handleTrChange = (e: ChangeEvent<HTMLTableRowElement>) => {
    setAmountHolidays((prev) => prev - 1);
    setTargetId(+e?.target?.id);
  };

  const handleResetClick = () => {
    setAmountHolidays(2);
    setDaysOfMonth?.(cloneData);
    setTargetId(undefined);
    setIsResetState((prev) => !prev);
    setIsSubmitBtnActive(false);
    setIsResetBtnActive(false);
  };

  useEffect(() => {
    const checkableDaysOfMonth = daysOfMonth?.map((day) =>
      day.isWorkDay === true
        ? { ...day, isCheckable: true }
        : { ...day, isCheckable: false },
    );
    setDaysOfMonth && setDaysOfMonth(checkableDaysOfMonth as ICheckbox[]);
    setCloneData(checkableDaysOfMonth as ICheckbox[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (amountHolidays >= 0 && targetId) {
      const updatedDaysOfMonth = daysOfMonth?.map((day) => {
        if (day?.id === targetId) {
          return {
            ...day,
            isWorkDay: !day?.isWorkDay,
            isCheckable: !day?.isCheckable,
          };
        }
        return day;
      });
      setDaysOfMonth?.(updatedDaysOfMonth as ICheckbox[]);
    }

    if (amountHolidays === 0) {
      const notCheckableDaysOfMonth = daysOfMonth?.map((day) => ({
        ...day,
        isCheckable: false,
      }));
      setDaysOfMonth?.(notCheckableDaysOfMonth as ICheckbox[]);
      setIsResetBtnActive(true);
      setIsSubmitBtnActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountHolidays, targetId]);

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
          {daysOfMonth &&
            monthToWeeks(daysOfMonth).map((items, index) => {
              return (
                <tr key={index} onChange={handleTrChange}>
                  {items?.map((item) => {
                    return (
                      <td key={item?.id} className="p-1">
                        <Checkbox
                          isWorkDay={item?.isWorkDay}
                          isOrder={item?.isOrder}
                          isNight={item?.isNight}
                          isHoliday={item?.isHoliday}
                          isToday={item?.isToday}
                          isCheckable={item?.isCheckable}
                          shouldBeOffday={item?.shouldBeOffday}
                          label={item?.label}
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
        to={`/new-preference/steps/4?${timeParams}`}
        className={`pointer-events-none ${
          isSubmitBtnActive && "pointer-events-auto"
        }`}
      >
        <BaseButton isDisabled={!isSubmitBtnActive}>Подтвердить</BaseButton>
      </Link>
    </div>
  );
};
