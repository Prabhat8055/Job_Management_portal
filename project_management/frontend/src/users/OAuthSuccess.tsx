import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "@/auth/store";
import apiClient from "@/config/ApiClient";
import type LoginResponseData from "@/model/LoginResponseData";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const changeLocalLoginData = useAuth((s) => s.changeLocalLoginData);

  useEffect(() => {
    const finish = async () => {
      try {
        const res = await apiClient.post<LoginResponseData>("/auth/refresh");
        const { accessToken, user } = res.data;
        changeLocalLoginData(accessToken, user, true);
        navigate("/dashboard", { replace: true });
      } catch {
        navigate("/oauth/failure", { replace: true });
      }
    };
    finish();
  }, [navigate, changeLocalLoginData]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-linear-to-br from-slate-100 via-white to-slate-200 dark:from-[#060816] dark:via-[#0B0F19] dark:to-[#111827]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
        Signing you in…
      </p>
    </div>
  );
};

export default OAuthSuccess;
