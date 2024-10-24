import { useTranslation } from "react-i18next";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import CheckboxGroup from "@shared/ui/checkbox-group";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import { SubheaderInfo } from "@shared/ui/subheader-info";
import UserProfileLink from "@shared/ui/user-profile-link";
import WorkingHours from "@shared/ui/working-hours";

const MyCurrentSchedule = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer>
      <HeaderContainer>
        <div className="flex items-center justify-between">
          <BackLink to="/" />
          <HeaderTitle className="text-center">
            {t("my_current_schedule.title")}
          </HeaderTitle>
          <UserProfileLink />
        </div>
      </HeaderContainer>
      <SubheaderInfo />
      <CheckboxGroup />
      <WorkingHours />
    </BaseContainer>
  );
};

export default MyCurrentSchedule;
