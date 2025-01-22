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

const PREFERENCE = {
  START: 15,
  END: 25,
};

interface IPreference {
  id: string;
  create_data: string;
  requested_date: string;
}

export const Home = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const token = localStorage.getItem("GCToken") as string;
  const [isBtnEditable, setIsBtnEditable] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const findLastPreference = (preferences: IPreference[]) => {
    const lastPreferenceDate = Math.max(
      ...preferences.map((preference: IPreference) =>
        new Date(preference.create_data).getTime(),
      ),
    );

    return (
      preferences.find(
        (item: IPreference) =>
          Number(new Date(item.create_data).getTime()) === lastPreferenceDate,
      ) || null
    );
  };
  const getAllPreferences = async () => {
    try {
      const res = await baseApi.get(`${API_MAP.GET_ALL_PREFERENCES}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === HttpStatusCode.OK) {
        // Extract the preferences data from the response
        const preferences = await res.data.result;
        // Find the most recent preference
        const lastPreference = findLastPreference(preferences);

        // Check if there are any preferences
        if (preferences.length && lastPreference) {
          // Get today's date
          const today = new Date().getDate();

          // Extract the creation date of the last preference
          const lastPreferenceDate = lastPreference.create_data;

          // Extract the year and month from the last preference date
          const lastPreferenceYear = new Date(lastPreferenceDate).getFullYear();
          const lastPreferenceMonth = new Date(lastPreferenceDate).getMonth();
          // Get the current month and year
          const thisMonth = new Date().getMonth();
          const thisYear = new Date().getFullYear();

          // Check if today's date is within the allowed preference interval
          const matchedInterval =
            PREFERENCE.START <= today && today <= PREFERENCE.END;

          // Determine if the last preference was made in the current month and year
          const isSameDate =
            lastPreferenceMonth + lastPreferenceYear === thisMonth + thisYear;

          // If the last preference was not made this month and the interval is matched, enable the button
          if (!isSameDate && matchedInterval) {
            setIsBtnEditable(true);
          }

          // Additional check for preferences and interval matching
          if (preferences.length && matchedInterval) {
            // Split the requested date of the last preference to get the year and month
            const splittedDate = lastPreference.requested_date.split("/");
            const requestedYear = splittedDate[0];
            const requestedMonth = splittedDate[1];

            // Set the button's editability based on whether a new preference can be added
            setIsBtnEditable(
              canUserAddPreference(
                Number(requestedMonth) + 1,
                +requestedYear,
              ) || false,
            );
          }
        } else {
          // If there are no preferences, enable the button
          setIsBtnEditable(true);
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
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
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
            title={t("pages.home.new_preference")}
            imgSrc={calendarTickPath}
          />
        </button>
        {isConfirmModalOpen ? (
          <ConfirmModal
            state={isConfirmModalOpen}
            setState={setIsConfirmModalOpen}
            modalText={t("pages.home.modal_text")}
            confirmBtnClick={() => setIsConfirmModalOpen(false)}
          />
        ) : null}
        <BaseLink
          to="schedules"
          title={t("pages.home.my_schedules")}
          imgSrc={calendarClockPath}
        />
        <BaseLink
          to="my-preferences"
          title={t("pages.home.my_preferences")}
          imgSrc={calendarListPath}
        />
      </div>
      <BlueLink
        to={TgSupportLink}
        title={t("pages.home.support")}
        className="ml-auto mt-auto mb-6"
      />
    </BaseContainer>
  );
};
