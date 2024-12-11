import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { schedulesApi } from "@shared/lib/baseApi";
import { generateCalendar, mergeArrays } from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import CheckboxGroup from "@shared/ui/checkbox-group";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";

export const SingleSchedule = () => {
  const params = useParams();
  const token = localStorage.getItem("GCToken") as string;

  const yearAndMonth = params.id?.split("-") || ["", ""];
  const year = yearAndMonth[0];
  const month = yearAndMonth[1];

  const [daysOfMonth, setDaysOfMonth] = useState<ICheckbox[]>([]);

  const getSingleSchedule = async () => {
    try {
      const res = await schedulesApi.get(
        `${API_MAP.GET_SINGLE_SCHEDULE_BY_MONTH}${year}%2F${month}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === HttpStatusCode.OK) {
        const data = res.data;
        const generatedData = generateCalendar(
          +year,
          +month,
          data.month.days[0].label,
          data.month.days.length,
        );

        const mergedArray = mergeArrays(generatedData, data.month.days);
        setDaysOfMonth(mergedArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center">
        <BackLink to="/schedules" />
        <HeaderTitle>Ваш график за {months[+month - 1].title}</HeaderTitle>
      </HeaderContainer>
      <CheckboxGroup
        data={daysOfMonth}
        month={month}
        year={year}
        isEditAvailable={false}
      />
    </BaseContainer>
  );
};
