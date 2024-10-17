import { useTranslation } from "react-i18next";

const WorkingTimeInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <hr />
      <div className="flex justify-between items-center my-6">
        <p>{t("my-current-schedule.working-time-info")}</p>
        <p className="bg-[#7878801F] py-1.5 px-2.5 rounded-md">17-02</p>
      </div>
    </>
  );
};

export default WorkingTimeInfo;
