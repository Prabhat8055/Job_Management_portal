import React, { useState, useEffect } from "react";
import { Menu, X, Briefcase, Sun, Moon, LayoutDashboard } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "@/auth/store";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const checkLogin = useAuth((s) => s.checkLogin);
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  // Toggle dark mode
  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink =
    "rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white";
  const activeLink = "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300";

  return (
    <nav
      className={`fixed left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-2xl border transition-all duration-300 ${
        scrolled
          ? "top-3 border-slate-200/80 bg-white/95 shadow-lg shadow-slate-200/30 dark:border-white/10 dark:bg-black/80 dark:shadow-black/40"
          : "top-4 border-white/40 bg-white/70 shadow-md dark:border-white/10 dark:bg-black/40"
      } backdrop-blur-xl`}
    >
      <div className="flex h-[60px] items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 shadow-md shadow-cyan-400/30 transition hover:scale-105">
            <Briefcase size={18} className="text-black" />
          </div>
          <span className="text-[17px] font-black tracking-tight text-slate-900 dark:text-white">
            Job<span className="text-cyan-500">Track</span>
          </span>
        </NavLink>

        {/* Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {checkLogin() ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={`${navLink} flex items-center gap-2`}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </button>

              <button
                onClick={() => navigate("/dashboard/profile")}
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-xs font-black text-black">
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                {user?.name}
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:hover:bg-red-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${navLink} ${isActive ? activeLink : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navLink} ${isActive ? activeLink : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-black shadow-sm shadow-cyan-400/20 transition hover:bg-cyan-300"
              >
                Sign Up
              </NavLink>
            </>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleDark}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen ? "max-h-80 pb-4" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-2 px-5 pt-1">
          {checkLogin() ? (
            <>
              <div className="flex items-center gap-2 rounded-xl bg-slate-100/80 px-4 py-3 dark:bg-white/10">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-xs font-black text-black">
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-500 dark:border-red-500/20 dark:bg-red-500/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-black shadow-sm shadow-cyan-400/20 hover:bg-cyan-300"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
