export const MyCurrentScheduleSubheader = () => {
  return (
    <table className="mt-2 w-full text-sm text-[#64748B]">
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
  );
};
