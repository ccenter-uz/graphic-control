import { t } from "i18next";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { baseApi } from "@shared/lib/baseApi";
import {
  canUserEditPreference,
  generateCalendar,
  mergeArrays,
} from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import CheckboxGroup from "@shared/ui/checkbox-group";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import { SubheaderInfo } from "@shared/ui/subheader-info";

interface iSubheaderInfo {
  id: number;
  title: string;
  value: string;
}

export const SinglePreference = () => {
  const WORKING_HOURS_OF_ORDER_SHCEDULE = "20-08";
  const { id } = useParams();
  localStorage.setItem("preferenceId", id || "");
  const token = localStorage.getItem("GCToken");

  const [data, setData] = useState<ICheckbox[]>([]);
  const [subheaderInfo, setSubheaderInfo] = useState<iSubheaderInfo[]>([]);

  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [isPreferenceForOrder, setIsPreferenceForOrder] =
    useState<boolean>(false);

  const [isPreferenceEditable, setIsPreferenceEditable] =
    useState<boolean>(false);
  const [supervisorName, setSupervisorName] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await baseApi.get(
        `${API_MAP.GET_SINGLE_PREFERENCE_BY_ID}${id}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === HttpStatusCode.OK) {
        const data = response.data;
        if (data.workingHours === WORKING_HOURS_OF_ORDER_SHCEDULE) {
          setIsPreferenceForOrder(true);
          setSupervisorName(data.supervizorName);
        }

        const prefenenceDate = data.requested_date.split("/");
        const requestedYear = prefenenceDate[0];
        const requestedMonth = prefenenceDate[1];

        setIsPreferenceEditable(
          canUserEditPreference(+requestedMonth, +requestedYear) || false,
        );

        const subheaderInfo = [
          {
            id: 1,
            title: "Рабочее время",
            value: data.workingHours,
          },
          {
            id: 2,
            title: "Причина",
            value: data.description,
          },
        ];
        setSubheaderInfo(subheaderInfo);

        const splittedRequestDate = data.requested_date.split("/");
        setYear(splittedRequestDate[0]);
        setMonth(splittedRequestDate[1]);

        const generatedData = generateCalendar(
          +year,
          +month,
          1,
          data.daysOfMonth.length,
        );

        const mergedArray = mergeArrays(generatedData, data.daysOfMonth);

        setData(mergedArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, month, token, year]);

  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center">
        <BackLink to="/my-preferences" />
        <HeaderTitle>
          {t("pages.single_preferences.title")} {months[+month - 1]?.title}
        </HeaderTitle>
      </HeaderContainer>
      <SubheaderInfo data={subheaderInfo} />
      {isPreferenceForOrder ? (
        <p className="text-sm text-[#64748B] mt-8 text-center">
          {t("pages.single_preferences.no_schedule")}: {supervisorName}.
        </p>
      ) : (
        <CheckboxGroup
          data={data}
          year={year}
          month={month}
          isEditAvailable={isPreferenceEditable}
        />
      )}
    </BaseContainer>
  );
};
