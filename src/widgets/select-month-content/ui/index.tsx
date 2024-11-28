import { Link } from "react-router-dom";

import { months } from "@shared/constants/months";

export const SelectMonthContent = () => {
  return (
    <ol className="grid grid-cols-4 gap-2 mt-10">
      {months.map((month, index) => {
        return (
          <li key={index}>
            <Link
              to="my-schedule"
              className="border border-[#b4c3fa] rounded-md h-20 text-[#506DD7] flex items-center justify-center active:bg-[#e8ecfa]"
            >
              {month}
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
