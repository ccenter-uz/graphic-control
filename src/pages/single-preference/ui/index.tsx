import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { months } from "@shared/constants/months";
import { baseApi } from "@shared/lib/baseApi";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import CheckboxGroup from "@shared/ui/checkbox-group";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";

interface IData {
  daysOfMonth: ICheckbox[];
  requested_date: string;
}

export const SinglePreference = () => {
  const { id } = useParams();
  localStorage.setItem("preferenceId", id || "");
  const token = localStorage.getItem("GCToken");
  const [data, setData] = useState({} as IData);
  useEffect(() => {
    baseApi
      .get(`Application/one/${id}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === HttpStatusCode.OK) {
          setData?.(res.data);
        }
      });
  }, [id, token]);
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center">
        <BackLink to="/my-preferences" />
        <HeaderTitle>
          Ваше предпочтение за{" "}
          {months[+data?.requested_date?.slice(5) - 1]?.title}
        </HeaderTitle>
      </HeaderContainer>
      <CheckboxGroup
        data={data?.daysOfMonth}
        year={data?.requested_date?.slice(0, 4)}
        month={data?.requested_date?.slice(5)}
      />
    </BaseContainer>
  );
};
