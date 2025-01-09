import { useTranslation } from "react-i18next";

export const TableHead = () => {
  const { t } = useTranslation();
  return (
    <thead>
      <tr>
        <th className="text-[#3C3C434D]">{t("shared.table_head.monday")}</th>
        <th className="text-[#3C3C434D]">{t("shared.table_head.tuesday")}</th>
        <th className="text-[#3C3C434D]">{t("shared.table_head.wednesday")}</th>
        <th className="text-[#3C3C434D]">{t("shared.table_head.thursday")}</th>
        <th className="text-[#3C3C434D]">{t("shared.table_head.friday")}</th>
        <th className="text-[#3C3C434D]">{t("shared.table_head.saturday")}</th>
        <th className="text-[#3C3C434D]">{t("shared.table_head.sunday")}</th>
      </tr>
    </thead>
  );
};
