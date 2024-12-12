import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { scheduleLinks } from "@shared/constants/local-data";
import { clockPath } from "@shared/constants/svg-paths";
import { baseApi } from "@shared/lib/baseApi";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import ConfirmModal from "@shared/ui/confirm-modal";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import { Loader } from "@shared/ui/loader";
import UserProfileLink from "@shared/ui/user-profile-link";

interface IPreference {
  id: string;
  offDays: string[];
  workingHours: string;
  daysOfMonth: ICheckbox[];
  description: string;
  requested_date: string;
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
  const [errorText, setError] = useState<string>("");
  const [preference, setPreference] = useState<IPreference>();

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const handleBtnClick = async () => {
    try {
      setIsLoading(true);
      const matchYear = month === 1 ? year - 1 : year;
      const matchMonth = month === 1 ? 12 : month + 1;

      const res = await baseApi.get(
        `${API_MAP.GET_PREFERENCES_BY_YEAR}${matchYear}&month=${matchMonth}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === HttpStatusCode.OK) {
        const neededId = res.data.result[0].id;

        try {
          const res = await baseApi.get(
            `${API_MAP.GET_SINGLE_PREFERENCE_BY_ID}${neededId}`,
            {
              headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (res.status === HttpStatusCode.OK) {
            const neededYear = month === 11 ? year + 1 : year;
            const neededMonth = month === 11 ? 1 : month + 1;
            const data = res.data;
            setPreference({
              ...data,
              requested_date: `${neededYear}/${neededMonth}`,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
      setIsModalOpen(!isModalOpen);
    }
  };

  const modalConfirmClick = async () => {
    try {
      setConfirmIsLoading(true);
      const res = await baseApi.post(API_MAP.CREATE_PREFERENCE, preference, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === HttpStatusCode.CREATED) {
        navigate("/done");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setConfirmIsLoading(false);
    }
  };

  return (
    <BaseContainer className="bg-[#F9FDFF]">
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to="/" />
        <HeaderTitle>{t("new-preference.title")}</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <div className="px-6 mt-6">
        <button
          onClick={handleBtnClick}
          className="w-full border rounded px-4 py-3 text-[#506DD7] text-sm min-h-[54px]"
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
            title={t("new-preference.smena")}
            to="select-supervisor"
            isBlue={true}
          />
        </div>
      </div>
    </BaseContainer>
  );
};
