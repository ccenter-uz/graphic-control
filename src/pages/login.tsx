import { useTranslation } from "react-i18next";

import { LoginForm } from "@widgets/login-form";

import { TgSupportLink } from "@shared/constants/links";
import BaseContainer from "@shared/ui/base-cotainer";
import BlueLink from "@shared/ui/blue-link";
import PageTitle from "@shared/ui/page-title";

import LoginImg from "../../assets/images/login.svg";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer>
      <div className="py-8 h-screen flex flex-col">
        <PageTitle>{t("login.title")}</PageTitle>
        <img src={LoginImg} className="my-10 mx-auto" />
        <LoginForm />
        <BlueLink
          to={TgSupportLink}
          title={t("login.support")}
          className="ml-auto mt-auto"
        />
      </div>
    </BaseContainer>
  );
};

export default LoginPage;
