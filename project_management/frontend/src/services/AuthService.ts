import type RegisterData from "@/model/RegisterData";
import apiClient from "@/config/ApiClient";

//User register
export const registerUser = async (signupData: RegisterData) => {
  //api call to server data
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};
