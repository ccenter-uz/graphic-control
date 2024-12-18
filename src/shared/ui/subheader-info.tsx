import { FC } from "react";

import { ISubheaderInfo } from "@shared/contexts/new-preference-context";

type Props = {
  className?: string;
  data: ISubheaderInfo[];
};

export const SubheaderInfo: FC<Props> = ({ data, className = "" }) => {
  return (
    <div className={`${className} bg-[#F0F7FE] px-6 py-2 rounded-2xl mt-5`}>
      <table className="w-full text-sm text-[#64748B]">
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item?.id}>
                <td className="py-1.5">{item?.title}</td>
                <td className="text-[#007AFF] pl-2 min-w-[100px] word-breaker">
                  {item?.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
