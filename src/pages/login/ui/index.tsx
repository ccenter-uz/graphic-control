import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "@widgets/login-form";

import { TgSupportLink } from "@shared/constants/links";
import BaseContainer from "@shared/ui/base-cotainer";
import BlueLink from "@shared/ui/blue-link";
import PageTitle from "@shared/ui/page-title";

import LoginImg from "../../../../assets/images/login.svg";

export const LoginPage = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("GCToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <BaseContainer>
      <div className="py-8 h-screen flex flex-col">
        <PageTitle>{t("pages.login.title")}</PageTitle>
        <img src={LoginImg} className="my-10 mx-auto" />
        <LoginForm />
        <BlueLink
          to={TgSupportLink}
          title={t("pages.login.support")}
          className="ml-auto mt-auto"
        />
      </div>
    </BaseContainer>
  );
};
