/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { baseApi, schedulesApi } from "@shared/lib/baseApi";
import { generateCalendar, mergeArrays } from "@shared/lib/helpers";
import { ICheckbox, IPreference } from "@shared/lib/types";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseButton from "@shared/ui/base-button";
import BaseContainer from "@shared/ui/base-cotainer";
import CheckboxGroup from "@shared/ui/checkbox-group";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import { Loader } from "@shared/ui/loader";
import WorkingHours from "@shared/ui/working-hours";

export const SupervisorsSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("GCToken") as string;
  const [loading, setLaoding] = useState<boolean>(false);
  const [data, setData] = useState<ICheckbox[]>([]);
  const { setErrorInfo } = useContext(NewPreferenceContext) || {};
  const [scheduleYear, setScheduleYear] = useState<string>("");
  const [scheduleMonth, setScheduleMonth] = useState<string>("");
  const [supervisorName, setSupervisorName] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [preference, setPreference] = useState<IPreference>();
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const getScheduleOfSupervisor = async () => {
    try {
      const matchingMonth = currentMonth === 12 ? 1 : currentMonth;
      const matchingYear = currentMonth === 12 ? currentYear + 1 : currentYear;
      setScheduleYear(`${matchingYear}`);
      setScheduleMonth(`${matchingMonth}`);
      setLaoding(true);
      const res = await schedulesApi.get(
        `${
          API_MAP.GET_SINGLE_SCHEDULE_OF_SUPERVISOR
        }${id}?year_and_month=${2024}%2F${11}`,
      );
      if (res.status === HttpStatusCode.OK) {
        const data = res.data;
        console.log(data, "lorem");
        const preference = {
          workingHours: data.month.workingHours,
          daysOfMonth: data.month.days,
          requested_date: `${matchingYear}/${matchingMonth}`,
        };
        setPreference(preference);
        setSupervisorName(data.name);
        const generatedData = generateCalendar(
          +matchingYear,
          +matchingMonth,
          data.month.days[0].label,
          data.month.days.length,
        );

        const mergedArray = mergeArrays(generatedData, data.month.days);
        setData(mergedArray);
      }
    } catch (error: any) {
      setErrorInfo?.({
        errorMessage: error.message,
        errorStatus: error.status,
      });
      navigate("/error");
      console.log(error);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getScheduleOfSupervisor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmClick = async () => {
    console.log(preference, "preference");

    try {
      setBtnLoading(true);
      const res = await baseApi.post(
        `${API_MAP.CREATE_PREFERENCE}`,
        preference,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === HttpStatusCode.CREATED) {
        navigate("/done");
      }
    } catch (error: any) {
      setErrorInfo?.({
        errorMessage: error.message,
        errorStatus: error.status,
      });
      navigate("/error");
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };
  return (
    <BaseContainer>
      <HeaderContainer className="flex">
        <BackLink to="/new-preference/select-supervisor" />
        <HeaderTitle>График - {supervisorName}</HeaderTitle>
      </HeaderContainer>
      {loading ? (
        <Loader />
      ) : (
        <CheckboxGroup
          isEditAvailable={false}
          month={scheduleMonth}
          year={scheduleYear}
          data={data}
        />
      )}
      <WorkingHours hours="Смена" />
      <BaseButton onClick={handleConfirmClick}>
        {btnLoading ? <Loader /> : "Подтвердить"}
      </BaseButton>
    </BaseContainer>
  );
};
