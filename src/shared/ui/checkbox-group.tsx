import { FC } from "react";

import { checkboxGroupData } from "@shared/constants/local-data";
import { chunkArray } from "@shared/lib/chunkArray";
import BaseDay from "@shared/ui/checkbox";

import BlueLink from "./blue-link";

const CheckboxGroup: FC = () => {
  const chunkedData = chunkArray(checkboxGroupData, 7);

  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h6 className="text-lg font-semibold">Октябрь 2024</h6>
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
                {rowData?.map((item) => {
                  return (
                    <td key={item?.id} className="p-1">
                      <BaseDay
                        isWorkDay={item?.isWorkDay}
                        isOrder={item?.isOrder}
                        isNight={item?.isNight}
                        isHoliday={item?.isHoliday}
                        isToday={item?.isToday}
                        isCheckable={item?.isCheckable}
                        label={item?.label}
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
