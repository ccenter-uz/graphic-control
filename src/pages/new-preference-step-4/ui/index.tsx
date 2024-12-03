import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Step4ReasonForm } from "@widgets/step-4-reason-form";

import { API_MAP } from "@shared/constants/apiMap";
import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { baseApi } from "@shared/lib/baseApi";
import { getOffDays, getRequestDate } from "@shared/lib/helpers";
import { ICheckbox } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseButton from "@shared/ui/base-button";
import WorkingHours from "@shared/ui/working-hours";

export const NewPreferenceStep4 = () => {14
  const [textareaValue, setTextareaValue] = useState(
    (localStorage.getItem("description") as string) || "",
  );
  const { setErrorInfo } = useContext(NewPreferenceContext) || {};

  const [timeParams] = useSearchParams();
  const [textareaValue, setTextareaValue] = useState("");
  const [isSubmitBtnActive, setIsSubmitBtnActive] = useState<boolean>(false);
  const navigate = useNavigate();
                                         
  const handleConfirmClick = () => {
    localStorage.setItem("description", textareaValue);
    const time = localStorage.getItem("workingHours");
    const offDays = localStorage.getItem("offDays");
    const daysOfMonth = localStorage.getItem("daysOfMonthAtStep3");
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const token = localStorage.getItem("GCToken") as string;
    const storedWorkingHours = localStorage.getItem("workingHours");
    const storedOffDays = localStorage.getItem("offDays");
    const storedDaysOfMonth = localStorage.getItem("daysOfMonthAtStep3");

    const filteredDaysOfMonth = JSON.parse(storedDaysOfMonth as string).filter(
      (item: ICheckbox) => item?.id <= 31,
    );
    const parsedOffDays = JSON.parse(storedOffDays as string);

    const data = {
      workingHours: storedWorkingHours,
      offDays: getOffDays(parsedOffDays),
      daysOfMonth: filteredDaysOfMonth,
      description: textareaValue.trim(),
      requested_date: getRequestDate(month, year),
    };

    baseApi
      .post(API_MAP.CREATE_PREFERENCE, data, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === HttpStatusCode.CREATED) {
          navigate("/done");
        }
      })
      .catch((error) => {
        if (error) {
          setErrorInfo?.({
            errorMessage: error?.message,
            errorStatus: error?.status,
          });
          navigate("/error");
        }
      });
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
          Подтвердить
        </BaseButton>
      </Link>
    </div>
  );
};
