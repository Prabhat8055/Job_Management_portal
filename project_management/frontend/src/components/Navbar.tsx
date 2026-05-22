import React, { useState } from "react";
import { Menu, X, Moon, Briefcase } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "@/auth/store";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);

  const navItemStyle =
    "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10";

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-2xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
      <div className="flex h-16 items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-400 p-2 text-black shadow-lg shadow-cyan-400/30">
            <Briefcase size={20} />
          </div>

          <h1 className="text-lg font-bold tracking-wide md:text-xl">
            Job<span className="text-cyan-500">Track</span>
          </h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-3 md:flex">
          {checkLogin() ? (
            <>
              <div
                className="rounded-xl bg-black/5 px-4 py-2 text-sm font-medium dark:bg-white/10"
                onClick={() => navigate("/dashboard/profile")}
              >
                {user?.name}
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${navItemStyle} ${
                    isActive
                      ? "bg-cyan-400 text-black"
                      : "text-black dark:text-white"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navItemStyle} ${
                    isActive
                      ? "bg-cyan-400 text-black"
                      : "text-black dark:text-white"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink to="/signup">
                <button className="rounded-xl bg-cyan-400 px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-cyan-400/30 transition-all duration-200 hover:scale-105 hover:bg-cyan-300">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}

          {/* Theme Button */}
          <button className="rounded-xl border border-black/10 bg-black/5 p-2 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
            <Moon size={18} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-xl p-2 transition hover:bg-black/5 dark:hover:bg-white/10 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-5">
          {checkLogin() ? (
            <>
              <div className="rounded-xl bg-black/5 px-4 py-3 text-sm font-medium dark:bg-white/10">
                {user?.name}
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={navItemStyle}
              >
                Home
              </NavLink>

              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={navItemStyle}
              >
                Login
              </NavLink>

              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                <button className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-black shadow-lg shadow-cyan-400/30 transition hover:bg-cyan-300">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
