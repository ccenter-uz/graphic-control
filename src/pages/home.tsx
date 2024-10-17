import { useTranslation } from "react-i18next";

import { HomeHeader } from "@widgets/home-header";

import { TgSupportLink } from "@shared/constants/links";
import {
  calendarClockPath,
  calendarListPath,
  calendarTickPath,
} from "@shared/constants/svg-paths";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import BlueLink from "@shared/ui/blue-link";

const Home = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer className="h-screen bg-[#f9fdff]">
      <HomeHeader />
      <div className="grid gap-7 mt-11 px-6">
        <BaseLink
          to="new-preference"
          title={t("home.new-preference")}
          imgSrc={calendarTickPath}
        />
        <BaseLink
          to="my-current-schedule"
          title={t("home.my-current-schedule")}
          imgSrc={calendarClockPath}
        />
        <BaseLink
          to="my-preferences"
          title={t("home.my-preferences")}
          imgSrc={calendarListPath}
        />
      </div>
      <BlueLink
        to={TgSupportLink}
        title={t("home.support")}
        className="ml-auto mt-auto"
      />
    </BaseContainer>
  );
};

export default Home;
