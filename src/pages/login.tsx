import { LoginForm } from "@widgets/login-form";

import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import PageTitle from "@shared/ui/page-title";

import LoginImg from "../../assets/images/login-img.svg";

const LoginPage = () => {
  return (
    <BaseContainer className="borderr">
      <div className="py-8 h-screen flex flex-col">
        <PageTitle>Авторизация</PageTitle>
        <img src={LoginImg} className="my-10 mx-auto" />
        <LoginForm />
        <BaseLink to="https://t.me/uztelecom_cce" className="ml-auto mt-auto">
          Поддержка
        </BaseLink>
      </div>
    </BaseContainer>
  );
};

export default LoginPage;
