import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

const OAuthFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-linear-to-br from-slate-100 via-white to-slate-200 px-4 dark:from-[#060816] dark:via-[#0B0F19] dark:to-[#111827]">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-black/5 bg-white/70 p-10 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
        <div className="rounded-2xl bg-red-100 p-4 dark:bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-black dark:text-white">
          Sign-in Failed
        </h2>
        <p className="max-w-xs text-center text-sm text-slate-500 dark:text-gray-400">
          Google sign-in was unsuccessful. Please try again or use email &amp;
          password.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-2 rounded-2xl bg-cyan-400 px-8 py-3 font-semibold text-black transition hover:bg-cyan-300"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default OAuthFailure;
