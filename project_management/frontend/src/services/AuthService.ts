import type RegisterData from "@/model/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/model/LoginData";

//User register
export const registerUser = async (signupData: RegisterData) => {
  //api call to server data
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};

//user login
export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post(`/auth/login`, loginData);
  console.log(response);
  return response.data;
};
