import { Internationalization } from "@features/internationalization";

import HeaderContainer from "@shared/ui/header-container";
import UserProfileLink from "@shared/ui/user-profile-link";

export const HomeHeader = () => {
  return (
    <HeaderContainer className="flex items-center justify-between">
      <Internationalization />
      <UserProfileLink />
    </HeaderContainer>
  );
};
