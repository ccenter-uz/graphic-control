import axios, { AxiosError } from "axios";
import { z } from "zod";

import { HttpStatusCode } from "@shared/model/httpStatus";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorCatchInterceptor = (error: any) => {
  const errMessage = error.message;

  if (+errMessage.slice(-3) === HttpStatusCode.FORBIDDEN) {
    localStorage.clear();
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

export const baseApi = axios.create({
  baseURL: "https://api.graphic.ccenter.uz/api/v1/Application/",
});

export const schedulesApi = axios.create({
  baseURL: "https://api.graphic.ccenter.uz/api/v1/agents/",
});

export const authApi = axios.create({
  baseURL: "https://api.graphic.ccenter.uz/api/v1/Auth/",
});

baseApi.interceptors.response.use(function (response) {
  return response;
}, errorCatchInterceptor);

schedulesApi.interceptors.response.use(function (response) {
  return response;
}, errorCatchInterceptor);

authApi.interceptors.response.use(function (response) {
  return response;
}, errorCatchInterceptor);

export function handleGenericError(error: AxiosError) {
  /**
   * spec told that only 422 status code should return GenericError errors
   * but sometimes responses with other statuses returns
   * the same shape of error, this is a reason why we cant use this code
   * and have to validate each response
   * @see https://realworld-docs.netlify.app/docs/specs/frontend-specs/swagger
   */
  // if (error.response?.status !== 422) {
  //   return Promise.reject(error)
  // }

  const validation = GenericErrorSchema.safeParse(error.response?.data);

  if (validation.error) {
    return error;
  }

  const message = formatValidationErrors(validation.data);

  return new AxiosError(
    message,
    error.code,
    error.config,
    error.request,
    error.response,
  );
}

const GenericErrorSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

type GenericError = z.infer<typeof GenericErrorSchema>;

function formatValidationErrors(data: GenericError): string {
  return Object.entries(data.errors)
    .map(([field, messages]) =>
      messages.map((message) => `${field}: ${message}`).join("\n"),
    )
    .join("\n");
}
