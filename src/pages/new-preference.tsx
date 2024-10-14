import { useTranslation } from "react-i18next";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import UserProfileLink from "@shared/ui/user-profile-link";

import ClockImg from "../../assets/images/clock.svg";

const NewPreference = () => {
  const links = [
    { id: 1, link: "07-16" },
    { id: 2, link: "08-17" },
    { id: 3, link: "09-18" },
    { id: 4, link: "11-20" },
    { id: 5, link: "13-22" },
    { id: 6, link: "15-24" },
    { id: 7, link: "17-02" },
  ];
  const { t } = useTranslation();
  return (
    <BaseContainer className="bg-[#F9FDFF]">
      <HeaderContainer className="flex items-center justify-between">
        <BackLink to="/" />
        <HeaderTitle>{t("new-preference.title")}</HeaderTitle>
        <UserProfileLink />
      </HeaderContainer>
      <div className="px-6 mt-6">
        <BaseLink
          title={t("new-preference.main-btn-title")}
          to="/"
          isBlue={true}
        />
        <div className="grid grid-rows-4 grid-flow-col gap-4 mt-6">
          {links?.map((item, index) => {
            return (
              <BaseLink
                key={index}
                to={`/new-preference/select-supervisor/${item?.link}`}
                title={item?.link}
                imgSrc={ClockImg}
              />
            );
          })}
          <BaseLink
            title={t("new-preference.smena")}
            to="select-supervisor/smena"
            isBlue={true}
          />
        </div>
      </div>
    </BaseContainer>
  );
};

export default NewPreference;
