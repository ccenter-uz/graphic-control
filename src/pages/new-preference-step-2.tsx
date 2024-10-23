import { chunkArray } from "@shared/lib/chunkArray";
import BaseDay from "@shared/ui/checkbox";

// {
//   id: 1,
//   isWorkDay: true,
//   isOrder: false,
//   isNight: true,
//   isHoliday: false,
//   isToday: false,
//   isCheckable: true,
//   label: 1,
// },

export const checkboxGroupDataa = [
  {
    id: 1,
    isWorkDay: true,
    isOrder: false,
    isNight: true,
    isHoliday: false,
    isToday: false,
    isCheckable: true,
    label: 1,
  },
  {
    id: 1,
    isWorkDay: true,
    isOrder: true,
    isNight: false,
    isHoliday: false,
    isToday: false,
    isCheckable: true,
    label: 2,
  },
  {
    id: 1,
    isWorkDay: true,
    isOrder: false,
    isNight: true,
    isHoliday: false,
    isToday: false,
    isCheckable: true,
    label: 3,
  },
  {
    id: 1,
    isWorkDay: true,
    isOrder: false,
    isNight: true,
    isHoliday: false,
    isToday: false,
    isCheckable: true,
    label: 4,
  },
  {
    id: 1,
    isWorkDay: true,
    isOrder: false,
    isNight: true,
    isHoliday: false,
    isToday: false,
    isCheckable: true,
    label: 5,
  },
  {
    id: 1,
    isWorkDay: true,
    isOrder: false,
    isNight: true,
    isHoliday: false,
    isToday: false,
    isCheckable: true,
    label: 6,
  },
  {
    id: 1,
    isWorkDay: true,
    isOrder: false,
    isNight: true,
    isHoliday: false,
    isToday: false,
    isCheckable: true,
    label: 7,
  },
];

const NewPreferenceStep2 = () => {
  const chunkedData = chunkArray(checkboxGroupDataa, 7);

  return (
    <div>
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

export default NewPreferenceStep2;
