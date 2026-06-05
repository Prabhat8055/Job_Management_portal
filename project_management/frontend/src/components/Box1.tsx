import * as React from "react";

interface DashboardStats {
  total?: number;
  applied?: number;
  interviewing?: number;
  offers?: number;
  rejected?: number;
  [key: string]: number | undefined;
}

interface Box1Props {
  stats: DashboardStats;
}

interface CardItem {
  id: number;
  title: string;
  key: keyof DashboardStats;
  icon: string;
  iconBg: string;
  valueColor: string;
}

const cards: CardItem[] = [
  {
    id: 1,
    title: "Total",
    key: "total",
    icon: "📋",
    iconBg: "bg-slate-100 dark:bg-white/10",
    valueColor: "text-slate-900 dark:text-white",
  },
  {
    id: 2,
    title: "Applied",
    key: "applied",
    icon: "📤",
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    valueColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 3,
    title: "Interviewing",
    key: "interviewing",
    icon: "🎤",
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    valueColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: 4,
    title: "Offers",
    key: "offers",
    icon: "🎉",
    iconBg: "bg-green-50 dark:bg-green-500/10",
    valueColor: "text-green-600 dark:text-green-400",
  },
  {
    id: 5,
    title: "Rejected",
    key: "rejected",
    icon: "❌",
    iconBg: "bg-red-50 dark:bg-red-500/10",
    valueColor: "text-red-500 dark:text-red-400",
  },
];

const Box1: React.FC<Box1Props> = ({ stats }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
    {cards.map((card) => (
      <div
        key={card.id}
        className="group flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/[0.07] dark:bg-white/4 dark:hover:border-white/15"
      >
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${card.iconBg}`}
        >
          {card.icon}
        </div>
        <div>
          <p className={`text-2xl font-black ${card.valueColor}`}>
            {stats[card.key] ?? 0}
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            {card.title}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default Box1;
