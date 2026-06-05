import {
  Briefcase,
  Mail,
  LockKeyhole,
  User,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import type RegisterData from "@/model/RegisterData";
import { registerUser } from "@/services/AuthService";
import { useNavigate, NavLink } from "react-router";
import OAuth2Buttons from "@/components/ui/OAuth2Buttons";
import { Spinner } from "@/components/ui/spinner";

const Signup = () => {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!data.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!data.password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      await registerUser(data);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#050810]">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-500/10" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/10" />
      </div>

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
              Create account
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Start tracking your job applications today
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.04] dark:shadow-none">
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={data.name}
                    onChange={handleInputChange}
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              </div>

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
                    value={data.email}
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
                    placeholder="Min. 6 characters"
                    value={data.password}
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
                    <Spinner /> Creating…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <ArrowRight size={16} />
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

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-semibold text-cyan-500 hover:text-cyan-400 hover:underline"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
