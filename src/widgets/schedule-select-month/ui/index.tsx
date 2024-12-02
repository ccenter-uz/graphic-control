import { Link } from "react-router-dom";

import { months } from "@shared/constants/months";

export const ScheduleSelectMonth = () => {
  const lorem = false;
  return (
    <div className="mt-10 border rounded-md">
      <h6 className="text-sm text-center font-semibold my-3">2024</h6>
      <hr />
      <ol className="grid grid-cols-4 gap-1 mt-2">
        {months.map((month, index) => {
          return (
            <li key={index}>
              <Link
                to="my-schedule"
                className={`${
                  lorem
                    ? "bg-[#fff] text-[#64748B] cursor-not-allowed pointer-events-none"
                    : ""
                } flex items-center justify-center py-2.5 rounded-md bg-[#F0F7FE] text-[#007AFF] active:bg-[#e8ecfa]`}
              >
                {month.title.slice(0, 3)}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
