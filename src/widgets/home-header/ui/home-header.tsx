// import { Internationalization } from "@features/internationalization";

import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import UserProfileLink from "@shared/ui/user-profile-link";

export const HomeHeader = () => {
  return (
    <HeaderContainer className="flex items-center justify-between">
      {/* <Internationalization /> */}
      <p></p>
      <HeaderTitle>Предпочтения графиков</HeaderTitle>
      <UserProfileLink />
    </HeaderContainer>
  );
};
