import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NewPreferenceValidations } from "@widgets/new-preference-validations";

import BackLink from "@shared/ui/back-link";
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
  return (
    <BaseContainer className="borderr">
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to={backLinkTo} />
        <HeaderTitle>Выберите предпочитаемые выходные дни</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <SubheaderInfo className="mt-5" />
      <StepIndicator currentStep={1} className="pt-5" />
      <Outlet />
      <WorkingHours />
      <NewPreferenceValidations />
    </BaseContainer>
  );
};
