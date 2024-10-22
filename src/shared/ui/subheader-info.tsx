import { FC } from "react";

type Props = {
  className?: string;
};

export const SubheaderInfo: FC<Props> = ({ className }) => {
  return (
    <div className={`${className} bg-[#F0F7FE] px-6 py-2 rounded-2xl mt-5`}>
      <table className="w-full text-sm text-[#64748B]">
        <tbody>
          <tr>
            <td>Сегодня у вас:</td>
            <td className="text-[#007AFF]">Рабочий день</td>
          </tr>
          <tr>
            <td>Основные входные дни:</td>
            <td className="text-[#007AFF]">ПН-ВТ</td>
          </tr>
          <tr>
            <td>Кол-во рабочих дней:</td>
            <td className="text-[#007AFF]">22</td>
          </tr>
          <tr>
            <td>Продуктивность:</td>
            <td className="text-[#007AFF]">87%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
