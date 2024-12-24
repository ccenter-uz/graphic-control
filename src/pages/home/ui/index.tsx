/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { HomeHeader } from "@widgets/home-header";

import { API_MAP } from "@shared/constants/apiMap";
import { TgSupportLink } from "@shared/constants/links";
import {
  calendarClockPath,
  calendarListPath,
  calendarTickPath,
} from "@shared/constants/svg-paths";
import { authApi, baseApi } from "@shared/lib/baseApi";
import { canUserAddPreference } from "@shared/lib/helpers";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import BlueLink from "@shared/ui/blue-link";
import ConfirmModal from "@shared/ui/confirm-modal";

export const Home = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const token = localStorage.getItem("GCToken") as string;
  const [isBtnEditable, setIsBtnEditable] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const getAllPreferences = async () => {
    try {
      const res = await baseApi.get(`${API_MAP.GET_ALL_PREFERENCES}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === HttpStatusCode.OK) {
        const preferences = res.data.result;
        const today = new Date().getDate();
        // const today = 14;
        if (!preferences.length && 15 <= today && today <= 25) {
          setIsBtnEditable(true);
        }

        if (preferences.length && 15 <= today && today <= 25) {
          const lastPreference = preferences[0];

          const year = lastPreference.requested_date.split("/")[0];
          const month = lastPreference.requested_date.split("/")[1];

          setIsBtnEditable(canUserAddPreference(+month, +year));
        }
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    }
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      const res = await authApi.get(API_MAP.GET_USER_INFO, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === HttpStatusCode.OK) {
        localStorage.setItem("userImage", res.data.image);
        localStorage.setItem("userFullName", res.data.name);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error, "error from Home page");
    }
  }, []);

  useEffect(() => {
    getAllPreferences();
    fetchUserInfo();
  }, []);

  const handleNewPreferenceClick = () => {
    if (isBtnEditable) {
      navigate("/new-preference");
    } else {
      setIsConfirmModalOpen(true);
    }
  };
  return (
    <BaseContainer className="h-screen bg-[#f9fdff]">
      <HomeHeader />
      <div className="grid gap-7 mt-11 px-6">
        <button onClick={handleNewPreferenceClick}>
          <BaseLink
            title={t("home.new-preference")}
            imgSrc={calendarTickPath}
          />
        </button>
        {isConfirmModalOpen ? (
          <ConfirmModal
            state={isConfirmModalOpen}
            setState={setIsConfirmModalOpen}
            confirmBtnTitle="OK"
            modalText={
              "Заявку можно оставить только с 15 по 25 число месяца, либо вы уже оставили её. Оставленную заявку можно просмотреть или изменить в разделе 'Мои предпочтения'"
            }
            confirmBtnClick={() => setIsConfirmModalOpen(false)}
          />
        ) : null}
        <BaseLink
          to="schedules"
          title={t("home.my-current-schedule")}
          imgSrc={calendarClockPath}
        />
        <BaseLink
          to="my-preferences"
          title={t("home.my-preferences")}
          imgSrc={calendarListPath}
        />
      </div>
      <BlueLink
        to={TgSupportLink}
        title={t("home.support")}
        className="ml-auto mt-auto mb-6"
      />
    </BaseContainer>
  );
};
