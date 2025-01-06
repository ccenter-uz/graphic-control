import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { baseApi, schedulesApi } from "@shared/lib/baseApi";
import {
  getDaysAvailability,
  isPreferenceEditable,
  monthToWeeks,
} from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import Checkbox from "@shared/ui/checkbox";

import { Loader } from "./loader";
import { TableHead } from "./table-head";

interface ICheckboxGroup {
  data?: ICheckbox[];
  month?: string;
  year?: string;
  isEditAvailable: boolean;
}

const CheckboxGroup: FC<ICheckboxGroup> = ({
  data,
  month,
  year,
  isEditAvailable,
}) => {
  if (month && year) {
    !isEditAvailable
      ? isEditAvailable
      : (isEditAvailable = isPreferenceEditable(+month, +year));
  }
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chunkedData = monthToWeeks(data || []);
  const id = localStorage.getItem("preferenceId") as string;
  const token = localStorage.getItem("GCToken") as string;

  const [holidays, setHolidays] = useState<string[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  const handleEditBtnClick = async () => {
    setIsLoading(true);
    try {
      const response = await baseApi.get(
        `${API_MAP.GET_SINGLE_PREFERENCE_BY_ID}${id}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;

      const offDays = getDaysAvailability(data.offDays);
      const workingHours = data.workingHours;
      const description = data.description;

      const daysOfMonth = data.daysOfMonth.map((item: ICheckbox) =>
        item.isSelectLikeHoliday ? { ...item, isWorkDay: true } : item,
      );

      localStorage.setItem("workingHours", workingHours);
      localStorage.setItem("description", description);
      localStorage.setItem("offDays", JSON.stringify(offDays));
      localStorage.setItem("daysOfMonthAtStep2", JSON.stringify(daysOfMonth));
    } catch (error) {
      console.error("Failed to fetch preference data:", error);
      // You can add error handling logic here, like setting an error state or showing a message
    } finally {
      setIsLoading(false);
      navigate("/new-preference");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h6 className="text-lg font-semibold">
          {month && months[+month - 1].title} {year}
        </h6>
        {isEditAvailable && (
          <button onClick={handleEditBtnClick} className="text-[#007AFF]">
            {isLoading ? <Loader /> : "Изменить"}
          </button>
        )}
      </div>
      <table className="my-5">
        <TableHead />
        <tbody>
          {chunkedData.map((rowData, index: number) => {
            return (
              <tr key={index}>
                {rowData.map((item) => {
                  return (
                    <td key={item?.id} className="p-1">
                      <Checkbox
                        id={item?.id}
                        isWorkDay={item?.isWorkDay}
                        isOrder={item?.isOrder}
                        isNight={item?.isNight}
                        isHoliday={
                          holidays
                            ? holidays?.includes(String(item?.label))
                            : item.isHoliday
                        }
                        isToday={item?.isToday}
                        isCheckable={
                          !isEditAvailable ? false : item.isCheckable
                        }
                        label={item?.label}
                        isAtWork={item?.isAtWork}
                        isReset={false}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CheckboxGroup;
