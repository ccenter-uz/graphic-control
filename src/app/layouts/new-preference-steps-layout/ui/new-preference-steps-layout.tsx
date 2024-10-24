import { FC } from "react";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";

import { layoutData } from "@shared/constants/local-data";
import BackLink from "@shared/ui/back-link";
import BaseButton from "@shared/ui/base-button";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import StepIndicator from "@shared/ui/step-indicator";
import { SubheaderInfo } from "@shared/ui/subheader-info";
import UserProfileLink from "@shared/ui/user-profile-link";
import WorkingHours from "@shared/ui/working-hours";

type Props = {
  backLinkTo: string;
};

export const NewPreferenceStepsLayout: FC<Props> = ({ backLinkTo }) => {
  const location = useLocation();
  const currentStep = location.pathname.charAt(location.pathname.length - 1);
  const [timeParams] = useSearchParams();

  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to={backLinkTo} />
        <HeaderTitle>Выберите предпочитаемые выходные дни</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <StepIndicator currentStep={currentStep} className="pt-5" />
      <SubheaderInfo data={layoutData} />
      <Outlet />
      <WorkingHours hours={timeParams.get("time")?.toString()} />
      <Link to={`/new-preference/steps/2?${timeParams}`}>
        <BaseButton>Подтвердить</BaseButton>
      </Link>
    </BaseContainer>
  );
};
