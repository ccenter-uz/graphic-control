import { FC } from "react";

import { months } from "@shared/constants/months";
import { monthToWeeks } from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import BaseDay from "@shared/ui/checkbox";

import BlueLink from "./blue-link";

interface ICheckboxGroup {
  data?: ICheckbox[];
  month?: string;
  year?: string;
}

const CheckboxGroup: FC<ICheckboxGroup> = ({ data, month, year }) => {
  const chunkedData = monthToWeeks(data || []);

  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h6 className="text-lg font-semibold">
          {month && months[+month - 1].title} {year}
        </h6>
        <BlueLink to="/" title="Изменить" />
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
