import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import CheckboxGroup from "@shared/ui/checkbox-group";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import UserProfileLink from "@shared/ui/user-profile-link";
import WorkingTimeInfo from "@shared/ui/working-time-info";

const MyCurrentSchedule = () => {
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to="/" />
        <HeaderTitle className="text-center">Мой текущий график</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <CheckboxGroup />
      <WorkingTimeInfo />
    </BaseContainer>
  );
};

export default MyCurrentSchedule;
