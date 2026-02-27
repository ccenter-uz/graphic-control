import { t } from "i18next";

import { MyPreferenceSelectMonth } from "@widgets/my-preference-select-month";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import SwipeBack from "@shared/ui/swipe-back";

export const MyPreferences = () => {
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center ">
        <BackLink to="/" />
        <HeaderTitle>{t("pages.my_preferences.title")}</HeaderTitle>
      </HeaderContainer>
      <p className="text-sm text-[#64748B] mt-8">
        {t("pages.my_preferences.select_month_title")}
      </p>
      <MyPreferenceSelectMonth />
      <SwipeBack />
    </BaseContainer>
  );
};
