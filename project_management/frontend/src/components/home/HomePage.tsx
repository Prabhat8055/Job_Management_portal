// import { CheckCircle2, NotebookPen, ArrowRight } from "lucide-react";

// const HomePage = () => {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 text-black transition-colors duration-300 dark:from-[#060816] dark:via-[#0B0F19] dark:to-[#111827] dark:text-white">
//       {/* Background Glow */}
//       <div className="absolute -left-30 -top-30 h-80 w-[320px] rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/20" />

//       <div className="absolute -bottom-30 -right-30 h-80 w-[320px] rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/20" />

//       {/* Main Content */}
//       <main className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-36">
//         <div className="grid w-full items-center gap-14 lg:grid-cols-2">
//           {/* LEFT SECTION */}
//           <div>
//             {/* Badge */}
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-600 backdrop-blur-lg dark:text-cyan-300">
//               <CheckCircle2 size={16} />
//               Track every application easily
//             </div>

//             {/* Heading */}
//             <h1 className="text-5xl font-black leading-tight md:text-6xl">
//               Organize Your
//               <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
//                 {" "}
//                 Job Search
//               </span>
//             </h1>

//             {/* Description */}
//             <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-gray-400">
//               Save jobs you applied for, manage interview progress, and keep
//               personal notes about every opportunity — all in one minimal
//               dashboard.
//             </p>

//             {/* Buttons */}
//             <div className="mt-10 flex flex-col gap-4 sm:flex-row">
//               <button className="group flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-4 text-lg font-semibold text-black shadow-xl shadow-cyan-400/20 transition hover:scale-105 hover:bg-cyan-300">
//                 Get Started
//                 <ArrowRight
//                   size={20}
//                   className="transition group-hover:translate-x-1"
//                 />
//               </button>

//               <button className="rounded-2xl border border-black/10 bg-black/5 px-7 py-4 text-lg font-medium backdrop-blur-xl transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="relative">
//             {/* Dashboard */}
//             <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
//               {/* Top */}
//               <div className="mb-6 flex items-center justify-between">
//                 <h2 className="text-xl font-bold">Applications</h2>

//                 <div className="rounded-xl bg-cyan-400/15 px-3 py-1 text-sm text-cyan-600 dark:text-cyan-300">
//                   12 Active
//                 </div>
//               </div>

//               {/* Job Cards */}
//               <div className="space-y-4">
//                 {[
//                   {
//                     company: "Google",
//                     role: "Frontend Developer",
//                     status: "Interview",
//                   },
//                   {
//                     company: "Microsoft",
//                     role: "Software Engineer",
//                     status: "Applied",
//                   },
//                   {
//                     company: "Amazon",
//                     role: "React Developer",
//                     status: "Rejected",
//                   },
//                 ].map((job, index) => (
//                   <div
//                     key={index}
//                     className="rounded-2xl border border-black/5 bg-slate-100/70 p-4 transition hover:border-cyan-400/40 dark:border-white/10 dark:bg-[#111827]/70"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="font-semibold">{job.company}</h3>

//                         <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
//                           {job.role}
//                         </p>
//                       </div>

//                       <span
//                         className={`rounded-lg px-3 py-1 text-xs font-medium ${
//                           job.status === "Interview"
//                             ? "bg-cyan-400/15 text-cyan-600 dark:text-cyan-300"
//                             : job.status === "Applied"
//                               ? "bg-yellow-400/15 text-yellow-700 dark:text-yellow-300"
//                               : "bg-red-400/15 text-red-600 dark:text-red-300"
//                         }`}
//                       >
//                         {job.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Notes */}
//               <div className="mt-6 rounded-2xl border border-black/5 bg-slate-100/80 p-4 dark:border-white/10 dark:bg-[#0F172A]/80">
//                 <div className="mb-3 flex items-center gap-2">
//                   <NotebookPen
//                     size={18}
//                     className="text-cyan-600 dark:text-cyan-300"
//                   />

//                   <h3 className="font-semibold">Quick Notes</h3>
//                 </div>

//                 <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">
//                   Prepare system design questions for Google interview on
//                   Friday. Follow up with Microsoft recruiter tomorrow.
//                 </p>
//               </div>
//             </div>

//             {/* Floating Cards */}
//             <div className="absolute -left-10 top-10 hidden rounded-2xl border border-black/5 bg-white/70 p-4 shadow-xl backdrop-blur-xl lg:block dark:border-white/10 dark:bg-white/10">
//               <p className="text-sm text-slate-500 dark:text-gray-300">
//                 Interviews
//               </p>

//               <h3 className="mt-1 text-2xl font-bold text-cyan-500 dark:text-cyan-300">
//                 05
//               </h3>
//             </div>

//             <div className="absolute -bottom-8 right-0 hidden rounded-2xl border border-black/5 bg-white/70 p-4 shadow-xl backdrop-blur-xl lg:block dark:border-white/10 dark:bg-white/10">
//               <p className="text-sm text-slate-500 dark:text-gray-300">
//                 Offers
//               </p>

//               <h3 className="mt-1 text-2xl font-bold text-green-500 dark:text-green-300">
//                 02
//               </h3>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;

import {
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Bell,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "@/auth/store";

const FEATURES = [
  {
    icon: <BarChart3 size={20} className="text-cyan-500" />,
    title: "Smart Analytics",
    desc: "Visualise your pipeline at a glance with live stats.",
  },
  {
    icon: <Bell size={20} className="text-blue-500" />,
    title: "Status Tracking",
    desc: "Know exactly where every application stands.",
  },
  {
    icon: <Shield size={20} className="text-indigo-500" />,
    title: "Private & Secure",
    desc: "Your data stays yours — no ads, no sharing.",
  },
  {
    icon: <Zap size={20} className="text-amber-500" />,
    title: "Instant Updates",
    desc: "Add a new application in under 10 seconds.",
  },
];

const DEMO_JOBS = [
  {
    company: "Google",
    role: "Frontend Developer",
    status: "Interview",
    color: "bg-cyan-400/15 text-cyan-700 dark:text-cyan-300",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    status: "Applied",
    color: "bg-yellow-400/15 text-yellow-700 dark:text-yellow-300",
  },
  {
    company: "Amazon",
    role: "React Developer",
    status: "Shortlisted",
    color: "bg-indigo-400/15 text-indigo-700 dark:text-indigo-300",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const checkLogin = useAuth((s) => s.checkLogin);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900 dark:bg-[#050810] dark:text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 h-[700px] w-[700px] rounded-full bg-cyan-400/10 blur-[150px] dark:bg-cyan-500/10" />
        <div className="absolute -bottom-60 -right-60 h-[700px] w-[700px] rounded-full bg-blue-400/10 blur-[150px] dark:bg-blue-600/10" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#6b7280 1px, transparent 1px), linear-gradient(90deg, #6b7280 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Hero */}
      <main className="relative mx-auto max-w-7xl px-6 pt-36 pb-24">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col items-start">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-4 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-300">
              <CheckCircle2 size={15} />
              Free forever · No credit card needed
            </div>

            <h1 className="text-5xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-[4rem]">
              Land your next{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                dream job
              </span>{" "}
              faster
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Track every application, manage interview stages, and keep
              personal notes — all in one beautiful, minimal dashboard.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() =>
                  navigate(checkLogin() ? "/dashboard" : "/signup")
                }
                className="group flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-3.5 text-base font-bold text-black shadow-xl shadow-cyan-400/20 transition-all hover:scale-[1.02] hover:bg-cyan-300 hover:shadow-cyan-400/30"
              >
                {checkLogin() ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="rounded-2xl border border-slate-200 bg-white/60 px-7 py-3.5 text-base font-medium text-slate-700 backdrop-blur-xl transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              >
                Sign In
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["C", "A", "R", "M"].map((l) => (
                  <div
                    key={l}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-white dark:border-[#050810]"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-white">
                  500+
                </span>{" "}
                job seekers tracking their journey
              </p>
            </div>
          </div>

          {/* RIGHT — Dashboard Preview */}
          <div className="relative hidden lg:block">
            {/* Floating badge - top left */}
            <div className="absolute -left-8 top-12 z-10 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/8">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interviews
              </p>
              <p className="mt-0.5 text-2xl font-black text-cyan-500">5</p>
            </div>

            {/* Floating badge - bottom right */}
            <div className="absolute -right-4 -bottom-6 z-10 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/8">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Offers
              </p>
              <p className="mt-0.5 text-2xl font-black text-green-500">2</p>
            </div>

            {/* Main card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-2xl dark:border-white/8 dark:bg-white/[0.04] dark:shadow-black/40">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  My Applications
                </h2>
                <span className="rounded-xl bg-cyan-400/12 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                  12 Active
                </span>
              </div>

              <div className="space-y-3">
                {DEMO_JOBS.map((job, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition hover:border-cyan-400/30 dark:border-white/5 dark:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-black text-slate-600 dark:from-white/10 dark:to-white/5 dark:text-slate-300">
                        {job.company[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {job.company}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {job.role}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${job.color}`}
                    >
                      {job.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-28">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400">
              Why JobTrack
            </p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Everything you need to stay organized
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-xl transition hover:border-slate-300 hover:shadow-lg dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/15"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/80 dark:bg-white/8">
                  {f.icon}
                </div>
                <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
