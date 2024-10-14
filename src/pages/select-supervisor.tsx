import { useTranslation } from "react-i18next";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";

const SelectSupervisor = () => {
  const links = [
    {
      id: 1,
      title: "Shahriyor",
      link: "supervisor-1",
    },
    {
      id: 2,
      title: "Turg'unov Abduqodir Jo'rayevich",
      link: "supervisor-2",
    },
    {
      id: 3,
      title: "Izzat",
      link: "supervisor-3",
    },
    {
      id: 4,
      title: "Yusupova Nargiza Abrorovna",
      link: "supervisor-4",
    },
  ];

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
        {links?.map((item) => {
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
