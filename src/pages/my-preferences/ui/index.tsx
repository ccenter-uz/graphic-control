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
        <HeaderTitle>Полный список ваших предпочтений</HeaderTitle>
      </HeaderContainer>
      <p className="text-sm text-[#64748B] mt-8">Выберите нужный месяц:</p>
      <MyPreferenceSelectMonth />
    </BaseContainer>
  );
};
