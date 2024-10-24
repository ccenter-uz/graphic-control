import { FC } from "react";

type Props = {
  className?: string;
  data: {
    id: number;
    title: string;
    value: string;
  }[];
};

export const SubheaderInfo: FC<Props> = ({ data, className }) => {
  return (
    <div className={`${className} bg-[#F0F7FE] px-6 py-2 rounded-2xl mt-5`}>
      <table className="w-full text-sm text-[#64748B]">
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item?.id}>
                <td>{item?.title}</td>
                <td className="text-[#007AFF]">{item?.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
