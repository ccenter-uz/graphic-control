import { useTranslation } from "react-i18next";

import { HomeHeader } from "@widgets/home-header";

import { TgSupportLink } from "@shared/constants/links";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import SupportLink from "@shared/ui/support-link";

import calendarClock from "../../assets/images/calendar-clock.svg";
import calendarList from "../../assets/images/calendar-list.svg";
import calendarTick from "../../assets/images/calendar-tick.svg";

const Home = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer className="h-screen bg-[#f9fdff]">
      <HomeHeader />
      <div className="grid gap-7 mt-11 px-6">
        <BaseLink
          to="new-preference"
          title={t("home.new-preference")}
          imgSrc={calendarTick}
        />
        <BaseLink
          to="my-current-schedule"
          title={t("home.my-current-schedule")}
          imgSrc={calendarClock}
        />
        <BaseLink
          to="my-preferences"
          title={t("home.my-preferences")}
          imgSrc={calendarList}
        />
      </div>
      <SupportLink
        to={TgSupportLink}
        title={t("home.support")}
        className="ml-auto mt-auto"
      />
    </BaseContainer>
  );
};

export default Home;
