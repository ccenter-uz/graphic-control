import { t } from "i18next";

import { SchedulesSelectMonth } from "@widgets/schedules-select-month";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import UserProfileLink from "@shared/ui/user-profile-link";

export const Schedules = () => {
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to="/" />
        <HeaderTitle>{t("pages.schedules.title")}</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <p className="text-sm text-[#64748B] mt-8">
        {t("pages.schedules.select_month_title")}
      </p>
      <SchedulesSelectMonth />
    </BaseContainer>
  );
};
