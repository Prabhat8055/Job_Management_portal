import { Briefcase, Mail, LockKeyhole, User, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

import type RegisterData from "@/model/RegisterData";

import { registerUser } from "@/services/AuthService";
import { useNavigate } from "react-router";
import OAuth2Buttons from "@/components/ui/OAuth2Buttons";

const Signup = () => {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);

    //validations
    if (data.name.trim() === "") {
      toast.error("Name is required");
      return;
    }
    if (data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    //form submit for registration
    try {
      const result = await registerUser(data);
      toast.success("User Registered Successfully");

      setData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error registering the user..");
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 dark:from-[#060816] dark:via-[#0B0F19] dark:to-[#111827]">
      {/* Background Glow */}
      <div className="absolute -left-25 -top-25 h-75 w-75 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/20" />

      <div className="absolute -bottom-25 -right-25 h-75 w-75 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/20" />

      {/* Space For Navbar */}
      <div className="h-24" />

      {/* Signup Section */}
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center px-6 pb-10">
        <Card className="relative w-full max-w-md rounded-3xl border border-black/5 bg-white/70 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-4 rounded-2xl bg-cyan-400 p-3 text-black shadow-lg shadow-cyan-400/30">
                <Briefcase size={28} />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">
                Create Account
              </h1>

              <p className="mt-2 text-center text-sm text-slate-600 dark:text-gray-400">
                Start tracking your job applications in one place.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="h-12 rounded-2xl border-black/10 bg-black/5 pl-11 dark:border-white/10 dark:bg-white/5"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

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
                    value={data.email}
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
                    placeholder="Create a password"
                    className="h-12 rounded-2xl border-black/10 bg-black/5 pl-11 dark:border-white/10 dark:bg-white/5"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Signup Button */}
              <Button
                className="h-12 w-full rounded-2xl bg-cyan-400 text-base font-semibold text-black hover:bg-cyan-300"
                type="submit"
              >
                Create Account
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
              <OAuth2Buttons />
            </form>

            {/* Bottom Text */}
            <p className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
              Already have an account?{" "}
              <span className="cursor-pointer font-semibold text-cyan-500 hover:text-cyan-400">
                Login
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
