import { useTranslation } from "react-i18next";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import UserProfileLink from "@shared/ui/user-profile-link";

import ClockImg from "../../assets/images/clock.svg";

const NewPreference = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer className="bg-[#F9FDFF]">
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to="/" />
        <HeaderTitle>{t("new-preference.title")}</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <div className="px-6 mt-6">
        <BaseLink title="Такой же как и прошлом месяце" to="/" color="blue" />
        <div className="grid grid-rows-4 grid-flow-col gap-4 mt-6">
          <BaseLink title="07-16" to="/" imgSrc={ClockImg} />
          <BaseLink title="08-17" to="/" imgSrc={ClockImg} />
          <BaseLink title="09-18" to="/" imgSrc={ClockImg} />
          <BaseLink title="11-20" to="/" imgSrc={ClockImg} />
          <BaseLink title="13-22" to="/" imgSrc={ClockImg} />
          <BaseLink title="15-24" to="/" imgSrc={ClockImg} />
          <BaseLink title="17-08" to="/" imgSrc={ClockImg} />
          <BaseLink title={t("new-preference.btnTitle")} to="/" color="blue" />
        </div>
      </div>
    </BaseContainer>
  );
};

export default NewPreference;
