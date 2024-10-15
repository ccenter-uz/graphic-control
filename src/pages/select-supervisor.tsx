import { useTranslation } from "react-i18next";

import { supervisors } from "@shared/constants/local-data";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";

const SelectSupervisor = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer>
      <HeaderContainer className="flex items-center ">
        <BackLink to="/new-preference" />
        <HeaderTitle>{t("select-supervisor.title")}</HeaderTitle>
      </HeaderContainer>
      <HeaderTitle className="text-center my-6">
        {t("select-supervisor.second-title")}
      </HeaderTitle>
      <div className=" grid gap-4 px-6">
        {supervisors?.map((item) => {
          return (
            <BaseLink
              key={item?.id}
              to={`${item?.link}`}
              title={item?.title}
              isBlue={true}
            />
          );
        })}
      </div>
    </BaseContainer>
  );
};

export default SelectSupervisor;
