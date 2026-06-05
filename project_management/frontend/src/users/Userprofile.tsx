import { useState } from "react";
import {
  Mail,
  CalendarDays,
  ShieldCheck,
  Edit,
  Trash2,
  Save,
  X,
  User,
} from "lucide-react";
import useAuth from "@/auth/store";

const Userprofile = () => {
  const user = useAuth((s) => s.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-8 pt-[84px] dark:bg-[#050810]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-400/5 blur-[100px] dark:bg-cyan-500/8" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-white/[0.07] dark:bg-white/[0.04] md:p-8">
          {/* Top section */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-4xl font-black text-black shadow-lg shadow-cyan-400/30">
              {user?.name?.[0]?.toUpperCase() ?? <User size={36} />}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {user?.name || "Unnamed User"}
                  </h2>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:justify-start">
                    <Mail size={14} />
                    {user?.email}
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${user?.enable ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}`}
                    >
                      <ShieldCheck size={12} />
                      {user?.enable ? "Verified" : "Not Verified"}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                      via {user?.provider || "email"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    placeholder="Full name"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    placeholder="Email"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-100 dark:border-white/8" />

          {/* Dates */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <CalendarDays size={15} />
              <span>
                Joined:{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <CalendarDays size={15} />
              <span>
                Updated:{" "}
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-100 dark:border-white/8" />

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-cyan-300"
                >
                  <Edit size={15} /> Edit Profile
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10">
                  <Trash2 size={15} /> Delete Account
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-cyan-300"
                >
                  <Save size={15} /> Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  <X size={15} /> Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
