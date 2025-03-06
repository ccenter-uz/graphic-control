import { t } from "i18next";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Step4ReasonForm } from "@widgets/step-4-reason-form";

import { API_MAP } from "@shared/constants/apiMap";
import { months } from "@shared/constants/months";
import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { baseApi } from "@shared/lib/baseApi";
import {
  getOffDays,
  getRequestDate,
  getTranslatedKeysWithTrueValues,
  clearLocalStorageExceptMultipleKeys,
  isTokenAvailable,
} from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseButton from "@shared/ui/base-button";
import { Loader } from "@shared/ui/loader";
import WorkingHours from "@shared/ui/working-hours";

const daysOfWeek: { [key: string]: string } = {
  Понедельник: "пн",
  Вторник: "вт",
  Среда: "ср",
  Четверг: "чт",
  Пятница: "пт",
  Суббота: "сб",
  Воскресенье: "вс",
};

function getHolidaysLabel(holidays: ICheckbox) {
  return holidays ? holidays.label + ", " : "";
}

export const NewPreferenceStep4 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState(
    (localStorage.getItem("description") as string) || "",
  );
  const {
    setErrorInfo,
    setBackLinkPath,
    setPageHeaderTitle,
    setSubHeaderInfoData,
  } = useContext(NewPreferenceContext) || {};

  const [timeParams] = useSearchParams();
  const [isSubmitBtnActive, setIsSubmitBtnActive] = useState<boolean>(false);

  const storedOffDays = localStorage.getItem("offDays");
  const storedDaysOfMonthAtStep3 = localStorage.getItem("daysOfMonthAtStep3");
  const storedDaysOfMonth = localStorage.getItem(
    storedDaysOfMonthAtStep3 ? "daysOfMonthAtStep3" : "daysOfMonthAtStep2",
  );
  const today = new Date();
  const month = today.getMonth();
  const needMonth = month === 11 ? 0 : month;

  useEffect(() => {
    const storedAmountOfHolidays = localStorage.getItem("amountOfHolidays");
    const offDays = getTranslatedKeysWithTrueValues(
      JSON.parse(storedOffDays as string),
    );
    const firstOffDay = daysOfWeek[offDays[0]];
    const secondOffDay = daysOfWeek[offDays[1]];

    const customOffDay = JSON.parse(storedDaysOfMonth as string).find(
      (item: ICheckbox) => item.customOffday === true,
    );

    const holidays = JSON.parse(storedDaysOfMonth as string).filter(
      (item: ICheckbox) => item.isSelectLikeHoliday === true,
    );

    setBackLinkPath?.(
      JSON.parse(storedAmountOfHolidays as string)
        ? "/new-preference/steps/3?" + timeParams
        : "/new-preference/steps/2?" + timeParams,
    );
    const pageTitle = t("pages.new_preference_step_4.title");
    setPageHeaderTitle?.(pageTitle);
    setSubHeaderInfoData?.([
      {
        id: 1,
        title: t("pages.new_preference_step_4.summary"),
        value: "",
      },
      {
        id: 2,
        title: t("pages.new_preference_step_4.working_hours"),
        value: timeParams.get("time")?.toString() || "",
      },
      {
        id: 3,
        title: t("pages.new_preference_step_4.weekends"),
        value: `${firstOffDay} | ${secondOffDay}`,
      },
      {
        id: 4,
        title: t("pages.new_preference_step_4.custom_offday"),
        value: customOffDay
          ? `${customOffDay.label} ${months[needMonth].title}`
          : t("pages.new_preference_step_4.not_selected"),
      },
      {
        id: 5,
        title: t("pages.new_preference_step_4.custom_offdays_instead_holidays"),
        value: `${getHolidaysLabel(holidays[0])} ${getHolidaysLabel(
          holidays[1],
        )} ${getHolidaysLabel(holidays[2])} ${getHolidaysLabel(
          holidays[3],
        )} ${getHolidaysLabel(holidays[4])} ${months[needMonth].title.slice(
          0,
          3,
        )}`,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmClick = async () => {
    try {
      setIsLoading(true);
      localStorage.setItem("description", textareaValue);

      const date = new Date();
      const month = date.getMonth();
      const year = date.getFullYear();

      const token = localStorage.getItem("GCToken") as string;

      const storedWorkingHours = localStorage.getItem("workingHours");
      const storedDaysOfMonthAtStep3 =
        localStorage.getItem("daysOfMonthAtStep3");
      const storedDaysOfMonth = localStorage.getItem(
        storedDaysOfMonthAtStep3 ? "daysOfMonthAtStep3" : "daysOfMonthAtStep2",
      );
      const storedPreferenceId = localStorage.getItem("preferenceId") as string;

      const filteredDaysOfMonth = JSON.parse(
        storedDaysOfMonth as string,
      )?.filter((item: ICheckbox) => item?.id <= 31);
      const parsedOffDays = JSON.parse(storedOffDays as string);

      const data = {
        workingHours: storedWorkingHours,
        offDays: getOffDays(parsedOffDays),
        daysOfMonth: filteredDaysOfMonth,
        description: textareaValue.trim(),
        requested_date: getRequestDate(month, year),
      };

      if (!storedPreferenceId) {
        const response = await baseApi.post(API_MAP.CREATE_PREFERENCE, data, {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === HttpStatusCode.CREATED) {
          navigate("/done");
        }
      } else {
        const response = await baseApi.patch(
          API_MAP.UPDATE_PREFERENCE + storedPreferenceId,
          data,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === HttpStatusCode.NO_CONTENT) {
          navigate("/done");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      !isTokenAvailable(error.status) ? navigate("/login") : null;
      setErrorInfo?.({
        errorMessage: error?.message,
        errorStatus: error?.status,
      });
      navigate("/error");
    } finally {
      clearLocalStorageExceptMultipleKeys(["token", "username"]);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Step4ReasonForm
        className="my-2"
        textareaValue={textareaValue}
        setTextareaValue={setTextareaValue}
        setIsSubmitBtnActive={setIsSubmitBtnActive}
      />
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link
        to={`/new-preference/steps/4?${timeParams}`}
        className={`pointer-events-none ${
          isSubmitBtnActive && "pointer-events-auto"
        }`}
      >
        <BaseButton
          isDisabled={!isSubmitBtnActive}
          onClick={handleConfirmClick}
        >
          {isLoading ? <Loader /> : t("pages.new_preference_step_4.submit")}
        </BaseButton>
      </Link>
    </div>
  );
};
