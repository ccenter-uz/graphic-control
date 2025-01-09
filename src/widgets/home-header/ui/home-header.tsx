import { t } from "i18next";

import { Internationalization } from "@features/internationalization";

import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import UserProfileLink from "@shared/ui/user-profile-link";

export const HomeHeader = () => {
  return (
    <HeaderContainer className="flex items-center justify-between">
      <Internationalization />
      <HeaderTitle>{t("widgets.home_header.title")}</HeaderTitle>
      <UserProfileLink />
    </HeaderContainer>
  );
};
