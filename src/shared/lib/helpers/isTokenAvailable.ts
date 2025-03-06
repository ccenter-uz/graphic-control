import { HttpStatusCode } from "@shared/model/httpStatus";

export const isTokenAvailable = (status: number) => {
  if (
    status === HttpStatusCode.UNAUTHORIZED ||
    status === HttpStatusCode.FORBIDDEN
  ) {
    return false;
  } else return true;
};
