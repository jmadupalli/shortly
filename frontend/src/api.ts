import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type ApiError = {
  response: {
    data: {
      message: string;
      status: number;
    };
  };
} & AxiosError;

export type LoginResponse = {
  firstName: string;
  lastName: string;
  token: string;
};

export const callLogin = (loginDTO: { email: string; password: string }) => {
  return axios.post<LoginResponse>(API_URL + "/auth/login", loginDTO);
};

export const callRegister = (registerDTO: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return axios.post(API_URL + "/auth/register", registerDTO);
};
