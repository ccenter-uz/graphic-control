import { useTranslation } from "react-i18next";

import { scheduleLinks } from "@shared/constants/local-data";
import { clockPath } from "@shared/constants/svg-paths";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";
import UserProfileLink from "@shared/ui/user-profile-link";

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
        <BaseLink
          title={t("new-preference.main-btn-title")}
          to="/"
          isBlue={true}
        />
        <div className="grid grid-rows-4 grid-flow-col gap-4 mt-6">
          {scheduleLinks?.map((item, index) => {
            return (
              <BaseLink
                key={index}
                to={`/new-preference/${item?.link}`}
                title={item?.link}
                imgSrc={clockPath}
              />
            );
          })}
          <BaseLink
            className="min-h-[54px]"
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
