import { MyPreferenceSelectMonth } from "@widgets/my-preference-select-month";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";

export const MyPreferences = () => {
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center ">
        <BackLink to="/" />
        <HeaderTitle>Мои предпочтение</HeaderTitle>
      </HeaderContainer>
      <MyPreferenceSelectMonth />
    </BaseContainer>
  );
};
