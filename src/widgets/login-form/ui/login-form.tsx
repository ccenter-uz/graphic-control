import BaseButton from "@shared/ui/base-button";
import { BaseInput } from "@shared/ui/base-input";

import LoginImg from "../../../../assets/images/password.svg";
import smsImg from "../../../../assets/images/sms.svg";

export const LoginForm = () => {
  return (
    <form className="grid gap-6">
      <BaseInput
        isInputError={false}
        inputPlaceholder="Никнейм"
        inputType="text"
        iconSrc={smsImg}
      />
      <BaseInput
        isInputError={false}
        inputPlaceholder="Пароль"
        inputType="password"
        iconSrc={LoginImg}
      />
      <BaseButton>Подтвердить</BaseButton>
    </form>
  );
};
