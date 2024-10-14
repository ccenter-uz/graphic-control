import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import WorkingTimeInfo from "@shared/ui/working-time-info";

const MyCurrentSchedule = () => {
  return (
    <BaseContainer>
      <HeaderContainer>
        <WorkingTimeInfo />
      </HeaderContainer>
    </BaseContainer>
  );
};

export default MyCurrentSchedule;
