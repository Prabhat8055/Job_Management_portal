import React from "react";
import { Clock, TrendingUp, Star } from "lucide-react";

/**
 * Quick-action / tips bar shown at the top of the dashboard.
 * Replace this with real "recent updates" data once the API supports it.
 */
const tips = [
  {
    icon: <Clock size={15} className="text-blue-500" />,
    label: "Follow-up reminder",
    desc: "Microsoft — no reply in 7 days",
  },
  {
    icon: <TrendingUp size={15} className="text-cyan-500" />,
    label: "Interview prep",
    desc: "Google on-site next Friday",
  },
  {
    icon: <Star size={15} className="text-amber-500" />,
    label: "Offer deadline",
    desc: "Amazon offer expires in 3 days",
  },
];

const List2: React.FC = () => (
  <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur-sm dark:border-white/[0.07] dark:bg-white/[0.04]">
    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      Recent Updates
    </p>
    <div className="grid gap-2 sm:grid-cols-3">
      {tips.map((t, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 dark:border-white/5 dark:bg-white/[0.03]"
        >
          <div className="mt-0.5 shrink-0">{t.icon}</div>
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {t.label}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default List2;
