import { CheckCircle2, NotebookPen, ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 text-black transition-colors duration-300 dark:from-[#060816] dark:via-[#0B0F19] dark:to-[#111827] dark:text-white">
      {/* Background Glow */}
      <div className="absolute -left-30 -top-30 h-80 w-[320px] rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/20" />

      <div className="absolute -bottom-30 -right-30 h-80 w-[320px] rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/20" />

      {/* Main Content */}
      <main className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-36">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2">
          {/* LEFT SECTION */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-600 backdrop-blur-lg dark:text-cyan-300">
              <CheckCircle2 size={16} />
              Track every application easily
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              Organize Your
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Job Search
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-gray-400">
              Save jobs you applied for, manage interview progress, and keep
              personal notes about every opportunity — all in one minimal
              dashboard.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="group flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-4 text-lg font-semibold text-black shadow-xl shadow-cyan-400/20 transition hover:scale-105 hover:bg-cyan-300">
                Get Started
                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-2xl border border-black/10 bg-black/5 px-7 py-4 text-lg font-medium backdrop-blur-xl transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="relative">
            {/* Dashboard */}
            <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
              {/* Top */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Applications</h2>

                <div className="rounded-xl bg-cyan-400/15 px-3 py-1 text-sm text-cyan-600 dark:text-cyan-300">
                  12 Active
                </div>
              </div>

              {/* Job Cards */}
              <div className="space-y-4">
                {[
                  {
                    company: "Google",
                    role: "Frontend Developer",
                    status: "Interview",
                  },
                  {
                    company: "Microsoft",
                    role: "Software Engineer",
                    status: "Applied",
                  },
                  {
                    company: "Amazon",
                    role: "React Developer",
                    status: "Rejected",
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-black/5 bg-slate-100/70 p-4 transition hover:border-cyan-400/40 dark:border-white/10 dark:bg-[#111827]/70"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{job.company}</h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                          {job.role}
                        </p>
                      </div>

                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-medium ${
                          job.status === "Interview"
                            ? "bg-cyan-400/15 text-cyan-600 dark:text-cyan-300"
                            : job.status === "Applied"
                              ? "bg-yellow-400/15 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-400/15 text-red-600 dark:text-red-300"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="mt-6 rounded-2xl border border-black/5 bg-slate-100/80 p-4 dark:border-white/10 dark:bg-[#0F172A]/80">
                <div className="mb-3 flex items-center gap-2">
                  <NotebookPen
                    size={18}
                    className="text-cyan-600 dark:text-cyan-300"
                  />

                  <h3 className="font-semibold">Quick Notes</h3>
                </div>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  Prepare system design questions for Google interview on
                  Friday. Follow up with Microsoft recruiter tomorrow.
                </p>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-10 top-10 hidden rounded-2xl border border-black/5 bg-white/70 p-4 shadow-xl backdrop-blur-xl lg:block dark:border-white/10 dark:bg-white/10">
              <p className="text-sm text-slate-500 dark:text-gray-300">
                Interviews
              </p>

              <h3 className="mt-1 text-2xl font-bold text-cyan-500 dark:text-cyan-300">
                05
              </h3>
            </div>

            <div className="absolute -bottom-8 right-0 hidden rounded-2xl border border-black/5 bg-white/70 p-4 shadow-xl backdrop-blur-xl lg:block dark:border-white/10 dark:bg-white/10">
              <p className="text-sm text-slate-500 dark:text-gray-300">
                Offers
              </p>

              <h3 className="mt-1 text-2xl font-bold text-green-500 dark:text-green-300">
                02
              </h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
