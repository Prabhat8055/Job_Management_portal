import React, { useState } from "react";
import { Menu, X, Moon, Briefcase } from "lucide-react";
import { NavLink } from "react-router";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between px-6 py-4 h-[3.2em]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-400 p-2 text-black shadow-lg shadow-cyan-400/30">
            <Briefcase size={20} />
          </div>

          <h1 className="text-xl font-bold tracking-wide">
            Job<span className="text-cyan-500">Track</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center gap-3">
          {/* Theme Icon */}
          <button className="rounded-xl border border-black/10 bg-black/5 p-2 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
            <Moon size={18} />
          </button>

          <NavLink to={"/"}>
            <button className="rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/10">
              Home
            </button>
          </NavLink>
          <NavLink to={"/login"}>
            <button className="rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/10">
              Login
            </button>
          </NavLink>

          <NavLink to={"/signup"}>
            <button className="rounded-xl bg-cyan-400 px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-cyan-400/20 transition hover:scale-105 hover:bg-cyan-300">
              Sign Up
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-black md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-6">
          <NavLink to={"/"}>
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-black backdrop-blur-lg transition hover:bg-white/10">
              Home
            </button>
          </NavLink>
          <NavLink to={"/login"}>
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-black backdrop-blur-lg transition hover:bg-white/10">
              Login
            </button>
          </NavLink>
          <NavLink to={"/signup"}>
            <button className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-black shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300">
              Sign Up
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
