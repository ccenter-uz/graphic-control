import { Dispatch, SetStateAction } from "react";

import { HttpStatusCode } from "@shared/model/httpStatus";

export function setErrorText(
  errorStatus: number,
  errorMessage: string,
  setError: Dispatch<SetStateAction<string>>,
) {
  if (HttpStatusCode.NOT_FOUND === errorStatus) {
    setError("Пользователь не существует или неверный пароль!");
  } else if (errorStatus >= HttpStatusCode.INTERNAL_SERVER_ERROR) {
    setError("Ошибка в сервере, обратитесь в службу поддержки!");
  } else if (errorMessage == "Network Error") {
    setError("Нет подключения к Интернету!");
  }
}
