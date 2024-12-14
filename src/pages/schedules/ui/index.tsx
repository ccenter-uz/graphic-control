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
        <HeaderTitle>Полный список ваших графиков</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <p className="text-sm text-[#64748B] mt-8">Выберите нужный месяц:</p>
      <SchedulesSelectMonth />
    </BaseContainer>
  );
};
