import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { scheduleLinks } from "@shared/constants/local-data";

type Props = {
  hours: string | undefined;
};
const WorkingHours: FC<Props> = ({ hours }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isActiveHour = scheduleLinks.find((item) => item?.time === hours);
    if (isActiveHour?.time !== hours) {
      navigate("/new-preference");
    }
  }, [hours, navigate]);

  const { t } = useTranslation();
  return (
    <>
      <hr />
      <div className="flex justify-between items-center my-6">
        <p>{t("shared.working_hours.title")}</p>
        <p className="bg-[#7878801F] py-1.5 px-2.5 rounded-md">{hours}</p>
      </div>
    </>
  );
};

export default WorkingHours;
