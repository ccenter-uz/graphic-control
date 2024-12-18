import { FC, useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { NewPreferenceContext } from "@shared/contexts/new-preference-context";
import { schedulesApi } from "@shared/lib/baseApi";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import StepIndicator from "@shared/ui/step-indicator";
import { SubheaderInfo } from "@shared/ui/subheader-info";
import UserProfileLink from "@shared/ui/user-profile-link";

type Props = {
  backLinkTo: string;
};

export const NewPreferenceStepsLayout: FC<Props> = () => {
  const token = localStorage.getItem("token") as string;
  const location = useLocation();
  const currentStep = location.pathname.charAt(location.pathname.length - 1);
  const [steps, setSteps] = useState<number[]>([1, 2, 3, 4]);
  const { backLinkPath, pageHeaderTitle, subHeaderInfoData } =
    useContext(NewPreferenceContext) || {};

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const matchingMonth = currentMonth === 12 ? 1 : currentMonth;

  const getHolidays = async () => {
    try {
      const res = await schedulesApi.get(
        `${API_MAP.GET_HOLIDAYS_BY_MONTH}${matchingMonth}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === HttpStatusCode.OK) {
        const holidays = res.data[0].holidays;
        const parsedHolidays = JSON.parse(holidays);
        const amountOfHolidays = Object.keys(parsedHolidays).length;
        localStorage.setItem("amountOfHolidays", amountOfHolidays.toString());
        if (amountOfHolidays === 0) {
          setSteps([1, 2, 3]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to={backLinkPath ? backLinkPath : "/"} />
        <HeaderTitle>{pageHeaderTitle}</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <StepIndicator steps={steps} currentStep={currentStep} className="pt-5" />
      <SubheaderInfo data={subHeaderInfoData ? subHeaderInfoData : []} />
      <Outlet />
    </BaseContainer>
  );
};
