import { useTranslation } from "react-i18next";

import { LoginPath, passwordPath } from "@shared/constants/svg-paths";
import BaseButton from "@shared/ui/base-button";
import { BaseInput } from "@shared/ui/base-input";

export const LoginForm = () => {
  const { t } = useTranslation();
  return (
    <form className="grid gap-6">
      <BaseInput
        isInputError={false}
        inputPlaceholder={t("login.username")}
        inputType="text"
        iconSrc={LoginPath}
      />
      <BaseInput
        isInputError={false}
        inputPlaceholder={t("login.password")}
        inputType="password"
        iconSrc={passwordPath}
      />
      <BaseButton>Войти</BaseButton>
    </form>
  );
};
