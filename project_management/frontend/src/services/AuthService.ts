import type RegisterData from "@/model/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/model/LoginData";
import type LoginResponseData from "@/model/LoginResponseData";

//User register
export const registerUser = async (signupData: RegisterData) => {
  //api call to server data
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};

//user login
export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post<LoginResponseData>(
    `/auth/login`,
    loginData,
  );
  console.log(response);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};
//refresh Token
export const refreshToken = async () => {
  const response = await apiClient.post<LoginResponseData>(`/auth/refresh`);
  return response.data;
};
