import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { LoginPath, passwordPath } from "@shared/constants/svg-paths";
import { authApi } from "@shared/lib/baseApi";
import { setErrorText } from "@shared/lib/helpers";
import { HttpStatusCode } from "@shared/model/httpStatus";
import BaseButton from "@shared/ui/base-button";
import { BaseInput } from "@shared/ui/base-input";
import { Loader } from "@shared/ui/loader";

interface IError {
  message: string;
  status: number;
}

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [password, setPasswordValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await authApi.post(API_MAP.SIGN_IN, {
        login: usernameValue,
        password: password,
      });

      if (response.status === HttpStatusCode.OK) {
        localStorage.setItem("GCToken", response.data.token);
        navigate("/");
      }
    } catch (error: unknown) {
      console.error(error);
      setErrorText(
        (error as IError).status,
        (error as IError).message,
        setError,
      );
    } finally {
      setIsLoading(false);
    }
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
      <BaseButton>{isLoading ? <Loader /> : "Войти"}</BaseButton>
    </form>
  );
};
