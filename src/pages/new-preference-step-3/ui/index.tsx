import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { getLastDayOfCurrentMonth, monthToWeeks } from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import BaseButton from "@shared/ui/base-button";
import Checkbox from "@shared/ui/checkbox";
import { TableHead } from "@shared/ui/table-head";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep3 = () => {
  const [timeParams] = useSearchParams();
  const { setDaysOfMonth } = useContext(NewPreferenceContext) ?? {};
  const [targetId, setTargetId] = useState<number>();
  const [daysOfMonthState, setDaysOfMonthState] = useState<ICheckbox[]>([]);

  const storedAmountHolidays = localStorage.getItem("amountOfHolidays");
  const [amountHolidays, setAmountHolidays] = useState<number>(
    JSON.parse(storedAmountHolidays as string),
  );

  const [isResetState, setIsResetState] = useState<boolean>(false);
  const [isResetBtnActive, setIsResetBtnActive] = useState<boolean>(false);
  const [isSubmitBtnActive, setIsSubmitBtnActive] = useState<boolean>(false);

  const { setBackLinkPath, setPageHeaderTitle, setSubHeaderInfoData } =
    useContext(NewPreferenceContext) || {};

  useEffect(() => {
    setBackLinkPath?.("/new-preference/steps/2?" + timeParams);
    if (amountHolidays === 1) {
      setPageHeaderTitle?.(
        "Выберите 1 рабочий день на замену 1 праздничного выходного дня.",
      );
    } else if (amountHolidays >= 2) {
      setPageHeaderTitle?.(
        `Выберите ${amountHolidays} рабочих дней на замену ${amountHolidays} праздничных выходных дней`,
      );
    }
    setSubHeaderInfoData?.([
      {
        id: 1,
        title: "Календарные дни",
        value: getLastDayOfCurrentMonth(),
      },
      {
        id: 2,
        title: "Кол-во праздничных дней",
        value: amountHolidays.toString(),
      },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountHolidays]);

  useEffect(() => {
    const storedDaysOfMonth = localStorage.getItem("daysOfMonthAtStep2");
    const cloneDaysArrayAtStep3 = JSON.parse(storedDaysOfMonth as string).map(
      (day: ICheckbox) =>
        day.isWorkDay === true
          ? { ...day, isCheckable: true }
          : { ...day, isCheckable: false },
    );
    const storedDaysOfMonthAtStep3 = localStorage.getItem("daysOfMonthAtStep3");
    const checkableDaysOfMonth = JSON.parse(
      storedDaysOfMonthAtStep3 !== null
        ? storedDaysOfMonthAtStep3
        : (storedDaysOfMonth as string),
    )?.map((day: ICheckbox) =>
      day.isWorkDay === true
        ? { ...day, isCheckable: true }
        : { ...day, isCheckable: false },
    );
    localStorage.setItem(
      "cloneDaysArrayAtStep3",
      JSON.stringify(cloneDaysArrayAtStep3),
    );
    if (storedDaysOfMonthAtStep3) {
      setIsResetBtnActive(true);
      setIsSubmitBtnActive(true);
    }
    setDaysOfMonthState?.(checkableDaysOfMonth as ICheckbox[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTrChange = (e: ChangeEvent<HTMLTableRowElement>) => {
    setAmountHolidays((prev) => prev - 1);
    setTargetId(+e?.target?.id);
  };

  useEffect(() => {
    let updatedDaysOfMonth;
    if (amountHolidays >= 0 && targetId) {
      const updatedDays = daysOfMonthState?.map((day) => {
        if (day?.id === targetId) {
          return {
            ...day,
            isWorkDay: !day?.isWorkDay,
            isCheckable: !day?.isCheckable,
            isSelectLikeHoliday: true,
          };
        }
        return day;
      });
      setDaysOfMonthState?.(updatedDays as ICheckbox[]);
      updatedDaysOfMonth = updatedDays;
    }

    if (amountHolidays === 0) {
      const notCheckableDaysOfMonth = updatedDaysOfMonth?.map((day) => ({
        ...day,
        isCheckable: false,
      }));

      setDaysOfMonthState?.(notCheckableDaysOfMonth as ICheckbox[]);
      setIsResetBtnActive(true);
      setIsSubmitBtnActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountHolidays, targetId]);

  const handleConfirmClick = () => {
    localStorage.setItem(
      "daysOfMonthAtStep3",
      JSON.stringify(daysOfMonthState),
    );
    setDaysOfMonth?.(daysOfMonthState);
  };

  const handleResetClick = () => {
    setAmountHolidays(JSON.parse(storedAmountHolidays as string));
    const storedCloneData = localStorage.getItem("cloneDaysArrayAtStep3");
    if (storedCloneData !== null) {
      setDaysOfMonthState?.(JSON.parse(storedCloneData as string));
    }
    setTargetId(undefined);
    setIsResetState((prev) => !prev);
    setIsSubmitBtnActive(false);
    setIsResetBtnActive(false);
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
        <TableHead />
        <tbody>
          {daysOfMonthState &&
            monthToWeeks(daysOfMonthState).map((items, index) => {
              return (
                <tr key={index} onChange={handleTrChange}>
                  {items?.map((item) => {
                    return (
                      <td key={item?.id} className="p-1">
                        <Checkbox
                          id={item?.id}
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
        <BaseButton
          isDisabled={!isSubmitBtnActive}
          onClick={handleConfirmClick}
        >
          Далее
        </BaseButton>
      </Link>
    </div>
  );
};
