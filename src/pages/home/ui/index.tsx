import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { HomeHeader } from "@widgets/home-header";

import { API_MAP } from "@shared/constants/apiMap";
import { TgSupportLink } from "@shared/constants/links";
import {
  calendarClockPath,
  calendarListPath,
  calendarTickPath,
} from "@shared/constants/svg-paths";
import { baseApi } from "@shared/lib/baseApi";
import { canUserAddPreference } from "@shared/lib/helpers";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import BlueLink from "@shared/ui/blue-link";

export const Home = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("GCToken") as string;
  const [isBtnEditable, setIsBtnEditable] = useState<boolean>(false);
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
        // const today = 16;
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

  useEffect(() => {
    getAllPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BaseContainer className="h-screen bg-[#f9fdff]">
      <HomeHeader />
      <div className="grid gap-7 mt-11 px-6">
        {!isBtnEditable ? (
          ""
        ) : (
          <BaseLink
            to="new-preference"
            title={t("home.new-preference")}
            imgSrc={calendarTickPath}
          />
        )}
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
