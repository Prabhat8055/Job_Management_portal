import useAuth from "@/auth/store";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8083/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 1000,
});

//on every request
apiClient.interceptors.request.use((config)=>{
  const accessToken = useAuth.getState().accessToken;
  if(accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config;
})


export default apiClient;