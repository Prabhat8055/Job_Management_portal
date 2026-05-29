import type LoginData from "@/model/LoginData";
import type LoginResponseData from "@/model/LoginResponseData";
import type User from "@/model/User";
import { loginUser, logoutUser } from "@/services/AuthService";
import { create } from "zustand";

import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";

// global auth state

export type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: (options?: { silent?: boolean }) => void;
  checkLogin: () => boolean | undefined;

  changeLocalLoginData: (
    accessToken: string,
    user: User,
    authStatus: boolean,
  ) => void;
};

//main logic for global state

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,
      login: async (loginData) => {
        console.log("started Login..");
        set({ authLoading: true });
        try {
          const loginResponseData = await loginUser(loginData);
          console.log(loginResponseData);
          set({
            accessToken: loginResponseData.accessToken,
            user: loginResponseData.user,
            authStatus: true,
          });
          return loginResponseData;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          set({
            authLoading: false,
          });
        }
      },
      logout: async () => {
        // try {
        //   if (!silent) {
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
        await logoutUser();
        set({
          accessToken: null,
          user: null,
          authLoading: false,
          authStatus: false,
        });
      },
      checkLogin: () => {
        if (get().accessToken && get().authStatus) return true;
        else return false;
      },

      changeLocalLoginData: (accessToken, user, authStatus) => {
        set({
          accessToken,
          user,
          authStatus,
        });
      },
    }),

    { name: LOCAL_KEY },
  ),
);

export default useAuth;
