import axios from "axios";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { LoginPath, passwordPath } from "@shared/constants/svg-paths";
import { baseApi } from "@shared/lib/baseApi";
import { setErrorText } from "@shared/lib/helpers";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseButton from "@shared/ui/base-button";
import { BaseInput } from "@shared/ui/base-input";

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    baseApi
      .post(API_MAP.SIGN_IN, {
        login: usernameValue,
        password: password,
      })
      .then(function (response) {
        if (response.status === HttpStatusCode.OK) {
          localStorage.setItem("GCToken", response.data.token);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);

        return setErrorText(error.status, error.message, setError);
      });
  };
  return (
    <form className="grid gap-6" onSubmit={handleFormSubmit}>
      <BaseInput
        inputValue={usernameValue}
        setInputValue={setUsernameValue}
        isInputError={false}
        inputPlaceholder={t("login.username")}
        inputType="text"
        iconSrc={LoginPath}
      />
      <BaseInput
        inputValue={password}
        setInputValue={setPasswordValue}
        isInputError={false}
        inputPlaceholder={t("login.password")}
        inputType="password"
        iconSrc={passwordPath}
      />
      <p className="text-red-600 text-sm">{error}</p>
      <BaseButton>Войти</BaseButton>
    </form>
  );
};
