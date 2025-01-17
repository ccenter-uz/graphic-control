/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { scheduleLinks } from "@shared/constants/local-data";
import { clockPath } from "@shared/constants/svg-paths";
import { baseApi, schedulesApi } from "@shared/lib/baseApi";
import { getOffDaysInObj } from "@shared/lib/helpers";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import ConfirmModal from "@shared/ui/confirm-modal";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import { Loader } from "@shared/ui/loader";
import UserProfileLink from "@shared/ui/user-profile-link";

interface IFetchData {
  username: string;
  year: number;
  month: number;
}

export const NewPreference = () => {
  const { t } = useTranslation();
  const [timeParams] = useSearchParams();
  const storedWorkingHours = localStorage.getItem("workingHours") as string;
  const token = localStorage.getItem("GCToken") as string;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBtnLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmLoading, setConfirmIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const [supervisorUsername, setSupervisorUsername] = useState<string>("");

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const matchMonth = month === 11 ? 12 : month + 1;
  const storedUsername = localStorage.getItem("username") as string;

  const fetchScheduleByLogin = async ({
    username,
    year,
    month,
  }: IFetchData): Promise<any> => {
    return schedulesApi.get(
      `${API_MAP.GET_SINGLE_SCHEDULE_OF_USER_BY_LOGIN}${username}?year_and_month=${year}%2F${month}`,
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  const handleBtnClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetchScheduleByLogin({
        username: storedUsername,
        year,
        month: matchMonth,
      });

      if (res.status === HttpStatusCode.OK) {
        const response = res.data.month;
        setSupervisorUsername(response.currentSupervisor);

        if (response.workingHours === "NO") {
          throw new Error("У вас нет ранее оставленных предпочтений");
        } else if (response.workingHours !== "20-08.") {
          const lastOffDays = getOffDaysInObj("пн", "сб");
          localStorage.setItem("workingHours", response.workingHours);
          localStorage.setItem("offDays", JSON.stringify(lastOffDays));
          navigate(
            `/new-preference/steps/2?time=${response.workingHours.slice(
              0,
              -1,
            )}`,
          );
        } else {
          setIsModalOpen(true);
        }
      }
    } catch (error: any) {
      setErrorText(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const modalConfirmClick = async () => {
    try {
      setConfirmIsLoading(true);
      const res = await fetchScheduleByLogin({
        username: supervisorUsername,
        year,
        month: matchMonth,
      });
      if (res.status === HttpStatusCode.OK) {
        const response = res.data;
        console.log(response);
        try {
          const res = await baseApi.post(
            API_MAP.CREATE_PREFERENCE,
            { supervizorName: response.name },
            {
              headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );
          if (res.status === HttpStatusCode.CREATED) {
            navigate("/done");
          }
        } catch (error: any) {
          console.log(error);
        }
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setConfirmIsLoading(false);
    }
  };

  return (
    <BaseContainer className="bg-[#F9FDFF]">
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to="/" />
        <HeaderTitle>{t("pages.new_preference.title")}</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <div className="px-6 mt-6">
        <button
          disabled={!!errorText}
          onClick={handleBtnClick}
          className={`${
            errorText ? "cursor-not-allowed" : ""
          } w-full border rounded px-4 py-3 text-[#506DD7] text-sm min-h-[54px]`}
        >
          {isBtnLoading ? (
            <Loader />
          ) : errorText ? (
            errorText
          ) : (
            "Такой же как и в прошлом месяце"
          )}
        </button>
        {isModalOpen ? (
          <ConfirmModal
            state={isModalOpen}
            setState={setIsModalOpen}
            confirmBtnClick={modalConfirmClick}
            modalText={
              "Вы действительно хотите использовать данные из прошлого месяца?"
            }
            confirmBtnTitle="Да"
            loading={isConfirmLoading}
          />
        ) : (
          ""
        )}
        <div className="grid grid-rows-4 grid-flow-col gap-4 mt-6">
          {scheduleLinks?.map((item, index) => {
            timeParams.set("time", item?.time);
            return (
              <BaseLink
                key={index}
                to={`/new-preference/steps/1?${timeParams}`}
                title={item?.time}
                imgSrc={clockPath}
                className={`${
                  storedWorkingHours === item.time ? "bg-[#dde4fd]" : ""
                }`}
              />
            );
          })}
          <BaseLink
            className="min-h-[54px]"
            title={t("pages.new_preference.order_btn_title")}
            to="select-supervisor"
            isBlue={true}
          />
        </div>
      </div>
    </BaseContainer>
  );
};
