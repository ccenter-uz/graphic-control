import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  hours: string | undefined;
};
const WorkingHours: FC<Props> = ({ hours }) => {
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
