import {
  Briefcase,
  Mail,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type LoginData from "@/model/LoginData";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate, NavLink } from "react-router";
import useAuth from "@/auth/store";
import OAuth2Buttons from "@/components/ui/OAuth2Buttons";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!loginData.password.trim()) {
      toast.error("Password is required");
      return;
    }
    try {
      setLoading(true);
      await login(loginData);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#050810]">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-500/10" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/10" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/5 blur-[80px] dark:bg-indigo-500/5" />
      </div>

      {/* Floating grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#6b7280 1px, transparent 1px), linear-gradient(90deg, #6b7280 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="h-20" />

      <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 pb-10">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 p-3 shadow-lg shadow-cyan-400/30">
              <Briefcase size={26} className="text-black" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Sign in to your JobTrack account
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.04] dark:shadow-none">
            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-500/20 dark:bg-red-500/10">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error.replace(/^Unauthorized access\s*/i, "")}
                </p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={handleInputChange}
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleInputChange}
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 pr-10 text-sm focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/5"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                disabled={loading}
                className="h-11 w-full cursor-pointer rounded-xl bg-cyan-400 text-sm font-bold text-black shadow-md shadow-cyan-400/20 transition-all hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 disabled:opacity-60"
                type="submit"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign in <ArrowRight size={16} />
                  </span>
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-slate-200 dark:border-white/10" />
                <span className="text-xs font-medium text-slate-400">OR</span>
                <div className="flex-1 border-t border-slate-200 dark:border-white/10" />
              </div>

              <OAuth2Buttons />
            </form>
          </div>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="font-semibold text-cyan-500 hover:text-cyan-400 hover:underline"
            >
              Create one
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
