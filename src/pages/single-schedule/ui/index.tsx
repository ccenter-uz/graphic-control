import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { schedulesApi } from "@shared/lib/baseApi";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
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
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleSchedule();
  }, []);
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center">
        <BackLink to="/schedules" />
        <HeaderTitle>Single Schedule</HeaderTitle>
      </HeaderContainer>
    </BaseContainer>
  );
};
