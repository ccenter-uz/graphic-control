import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import StepIndicator from "@shared/ui/step-indicator";
import UserProfileLink from "@shared/ui/user-profile-link";

type Props = {
  backLinkTo: string;
};

export const NewPreferenceStepsLayout: FC<Props> = ({ backLinkTo }) => {
  const location = useLocation();
  const currentStep = location.pathname.charAt(location.pathname.length - 1);

  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to={backLinkTo} />
        <HeaderTitle>Выберите предпочитаемые выходные дни</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <StepIndicator currentStep={currentStep} className="pt-5" />
      <Outlet />
    </BaseContainer>
  );
};
