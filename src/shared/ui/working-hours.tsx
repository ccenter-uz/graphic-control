import { useTranslation } from "react-i18next";

const WorkingHours = () => {
  const { t } = useTranslation();
  return (
    <>
      <hr />
      <div className="flex justify-between items-center my-6">
        <p>{t("shared.working_hours.title")}</p>
        <p className="bg-[#7878801F] py-1.5 px-2.5 rounded-md">17-02</p>
      </div>
    </>
  );
};

export default WorkingHours;
