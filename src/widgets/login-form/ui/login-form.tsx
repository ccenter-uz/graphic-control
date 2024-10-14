import { useTranslation } from "react-i18next";

import BaseButton from "@shared/ui/base-button";
import { BaseInput } from "@shared/ui/base-input";

import passwordImg from "../../../../assets/images/password.svg";
import smsImg from "../../../../assets/images/sms.svg";

export const LoginForm = () => {
  const { t } = useTranslation();
  return (
    <form className="grid gap-6">
      <BaseInput
        isInputError={false}
        inputPlaceholder={t("login.username")}
        inputType="text"
        iconSrc={smsImg}
      />
      <BaseInput
        isInputError={false}
        inputPlaceholder={t("login.password")}
        inputType="password"
        iconSrc={passwordImg}
      />
      <BaseButton>Войти</BaseButton>
    </form>
  );
};
