import useAuth from "@/auth/store";
import { refreshToken } from "@/services/AuthService";
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
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pending: any[] = [];

//function to add req in queue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queueRequest(cb: any) {
  pending.push(cb);
}

//resolve all req
function resolveQueue(newToken: string) {
  pending.forEach((cb) => cb(newToken));
  pending = [];
}

//Response Intercepters
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const is401 = error.response.status === 401;
    const original = error.config;
    if (!is401 || original._retry) {
      //message
      return Promise.reject(error);
    }

    //we will try to refresh the token

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queueRequest((newToken: string) => {
          if (!newToken) return reject();
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(original));
        });
      });
    }
    //start refreshing
    isRefreshing = true;
    try {
      const loginResponse = await refreshToken();
      const newToken = loginResponse.accessToken;
      useAuth
        .getState()
        .changeLocalLoginData(
          loginResponse.accessToken,
          loginResponse.user,
          true,
        );
        resolveQueue(newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
    } catch (error) {
      resolveQueue("null");
      useAuth.getState().logout();
      return Promise.reject(error);
      
    }finally{
      isRefreshing=false;
    }
  },
);

export default apiClient;
