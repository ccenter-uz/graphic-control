import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { baseApi } from "@shared/lib/baseApi";
import { getDaysAvailability, monthToWeeks } from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import BaseDay from "@shared/ui/checkbox";

interface ICheckboxGroup {
  data?: ICheckbox[];
  month?: string;
  year?: string;
}

const CheckboxGroup: FC<ICheckboxGroup> = ({ data, month, year }) => {
  const navigate = useNavigate();
  const chunkedData = monthToWeeks(data || []);
  const id = localStorage.getItem("preferenceId") as string;
  const token = localStorage.getItem("GCToken") as string;

  const handleEditBtnClick = async () => {
    await baseApi
      .get(API_MAP.GET_SINGLE_PREFERENCE_BY_ID + `${id}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const dataFromApi = res.data;
        const offDays = getDaysAvailability(dataFromApi.offDays);
        const workingHours = dataFromApi.workingHours;
        const description = dataFromApi.description;
        const daysOfMonth = dataFromApi.daysOfMonth.map((item: ICheckbox) => {
          if (item?.isSelectLikeHoliday) {
            return {
              ...item,
              isWorkDay: true,
            };
          } else {
            return item;
          }
        });
        localStorage.setItem("workingHours", workingHours);
        localStorage.setItem("description", description);
        localStorage.setItem("offDays", JSON.stringify(offDays));
        localStorage.setItem("daysOfMonthAtStep2", JSON.stringify(daysOfMonth));
        navigate("/new-preference");
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h6 className="text-lg font-semibold">
          {month && months[+month - 1].title} {year}
        </h6>
        <button onClick={handleEditBtnClick} className="text-[#007AFF]">
          Изменить
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
          {chunkedData.map((rowData, index: number) => {
            return (
              <tr key={index}>
                {rowData.map((item) => {
                  return (
                    <td key={item?.id} className="p-1">
                      <BaseDay
                        id={item?.id}
                        isWorkDay={item?.isWorkDay}
                        isOrder={item?.isOrder}
                        isNight={item?.isNight}
                        isHoliday={item?.isHoliday}
                        isToday={item?.isToday}
                        isCheckable={item?.isCheckable}
                        label={item?.label}
                        shouldBeOffday={item?.shouldBeOffday}
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
