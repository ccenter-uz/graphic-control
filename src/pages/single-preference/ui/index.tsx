import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { baseApi } from "@shared/lib/baseApi";
import { generateCalendar, mergeArrays } from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import CheckboxGroup from "@shared/ui/checkbox-group";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";

export const SinglePreference = () => {
  const { id } = useParams();
  localStorage.setItem("preferenceId", id || "");
  const token = localStorage.getItem("GCToken");
  const [data, setData] = useState<ICheckbox[]>([]);
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  useEffect(() => {
    baseApi
      .get(`${API_MAP.GET_SINGLE_PREFERENCE_BY_ID}${id}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === HttpStatusCode.OK) {
          console.log(res.data);
          const splittedRequestDate = res.data.requested_date.split("/");
          setYear(splittedRequestDate[0]);
          setMonth(splittedRequestDate[1]);
          const data = res.data;

          const generatedData = generateCalendar(
            +year,
            +month,
            data.daysOfMonth[0].label,
            data.daysOfMonth.length,
          );

          const mergedArray = mergeArrays(generatedData, data.daysOfMonth);
          setData(mergedArray);
        }
      });
    console.log(month);
  }, [id, month, token, year]);
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center">
        <BackLink to="/my-preferences" />
        <HeaderTitle>
          Ваше предпочтение за {months[+month - 1]?.title}
        </HeaderTitle>
      </HeaderContainer>
      <CheckboxGroup
        data={data}
        year={year}
        month={month}
        isEditAvailable={true}
      />
    </BaseContainer>
  );
};
