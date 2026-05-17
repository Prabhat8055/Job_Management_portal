import {
  Briefcase,
  Mail,
  LockKeyhole,
  ArrowRight,
  CheckCircle2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type LoginData from "@/model/LoginData";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { loginUser } from "@/services/AuthService";
import { Alert, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import useAuth from "@/auth/store";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);
    console.log(loginData);
    //validations
    if (loginData.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (loginData.password.trim() === "") {
      toast.error("Password is required");
      return;
    }
    try {
      setLoading(true);
      // await loginUser(loginData);

      //loginAuth
      const userInfo = await login(loginData);
      toast.success("Login success");
      console.log(userInfo);
      
      setLoginData({
        email: "",
        password: "",
      });

      navigate("/jobtracking");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 dark:from-[#060816] dark:via-[#0B0F19] dark:to-[#111827]">
      {/* Background Glow */}
      <div className="absolute -left-25 -top-25 h-75 w-75 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/20" />
      <div className="absolute -bottom-25 -right-25 h-75 w-75 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/20" />
      {/* Navbar Height Space */}
      <div className="h-23" />

      {/* Login Section */}
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center px-6 pb-10">
        <Card className="relative w-full max-w-md rounded-3xl border border-black/5 bg-white/70 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-4 rounded-2xl bg-cyan-400 p-3 text-black shadow-lg shadow-cyan-400/30">
                <Briefcase size={28} />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">
                Welcome Back
              </h1>

              <p className="mt-2 text-center text-sm text-slate-600 dark:text-gray-400">
                Login to continue tracking your job applications.
              </p>

              <div className="mt-4">
                {error && (
                  <Alert variant={"destructive"}>
                    <CheckCircle2Icon />
                    <AlertTitle>
                      {error.replace(/^Unauthorized access\s*/i, "")}
                    </AlertTitle>
                  </Alert>
                )}
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 rounded-2xl border-black/10 bg-black/5 pl-11 dark:border-white/10 dark:bg-white/5"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 rounded-2xl border-black/10 bg-black/5 pl-11 dark:border-white/10 dark:bg-white/5"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                disabled={loading}
                className="h-12 w-full cursor-pointer rounded-2xl bg-cyan-400 text-base font-semibold text-black hover:bg-cyan-300"
                type="submit"
              >
                {loading ? (
                  <>
                    <Spinner /> Please Wait...
                  </>
                ) : (
                  "Login"
                )}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-1 border-t border-black/10 dark:border-white/10" />

                <span className="px-3 text-sm text-slate-500 dark:text-gray-400">
                  OR
                </span>

                <div className="flex-1 border-t border-black/10 dark:border-white/10" />
              </div>

              {/* Google Button */}
              <Button
                variant="outline"
                className="h-12 w-full rounded-2xl border-black/10 bg-white/60 text-black hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="mr-3 h-5 w-5"
                />
                Continue with Google
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
              Don't have an account?{" "}
              <span className="cursor-pointer font-semibold text-cyan-500 hover:text-cyan-400">
                SignUp
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
