import { useEffect, useState, useCallback } from "react";
import Box1 from "@/components/Box1";
import JobForm from "@/components/JobForm";
import List2 from "@/components/List2";
import Table3 from "@/components/Table3";
import {
  getData,
  deleteSelectedData,
  getDashboardStatus,
} from "@/services/FormService";
import useAuth from "@/auth/store";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";

interface JobApplication {
  id: number;
  company: string;
  role: string;
  type: string;
  source: string;
  date: string;
  status: string;
  notes: string;
}

interface ApiJobData {
  id: number;
  companyName: string;
  role: string;
  jobType: string;
  source: string;
  appliedDate: string;
  status: string;
  notes: string;
}

interface DashboardStatus {
  totalApplications?: number;
  interviews?: number;
  offers?: number;
  rejected?: number;
  [key: string]: number | undefined;
}

const Userhome = () => {
  const [rows, setRows] = useState<JobApplication[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [stats, setStats] = useState<DashboardStatus>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const username = useAuth((s) => s.user?.name);

  const fetchData = useCallback(async () => {
    try {
      const data: ApiJobData[] = await getData();
      setRows(
        data.map((item) => ({
          id: item.id,
          company: item.companyName,
          role: item.role,
          type: item.jobType,
          source: item.source,
          date: new Date(item.appliedDate).toLocaleDateString(),
          status: item.status,
          notes: item.notes,
        })),
      );
    } catch {
      /* silently fail */
    }
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStatus();
      setStats(data);
    } catch {
      /* silently fail */
    }
  };

  const handleDelete = async (id: number | null) => {
    if (!id) return;
    if (!window.confirm("Delete this application?")) return;
    try {
      await deleteSelectedData(id);
      toast.success("Application deleted");
      setSelectedId(null);
      setRefreshKey((p) => p + 1);
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [refreshKey, fetchData]);

  const refreshDashboard = () => setRefreshKey((p) => p + 1);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-8 pt-[84px] dark:bg-[#050810]">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-400/5 blur-[100px] dark:bg-cyan-500/8" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-blue-400/5 blur-[100px] dark:bg-blue-600/8" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {username
              ? `Welcome back, ${username.split(" ")[0]} 👋`
              : "Dashboard"}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening with your job search
          </p>
        </div>

        {/* Stats */}
        <div className="mb-5">
          <Box1 stats={stats} />
        </div>

        {/* Recent updates */}
        <div className="mb-5">
          <List2 />
        </div>

        {/* Table header */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            My Applications
          </h2>
          <div className="flex gap-2">
            <button
              disabled={!selectedId}
              onClick={() => toast("Edit coming soon!", { icon: "✏️" })}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              disabled={!selectedId}
              onClick={() => handleDelete(selectedId)}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-500/20 dark:bg-red-500/10 dark:hover:bg-red-500/20"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>

        {/* Hint */}
        {selectedId && (
          <p className="mb-2 text-xs text-cyan-600 dark:text-cyan-400">
            Row #{selectedId} selected — click again to deselect
          </p>
        )}

        {/* Main grid */}
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          {/* Table */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-white/[0.07] dark:bg-white/[0.04]">
            <Table3
              rows={rows}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onDeleteSuccess={refreshDashboard}
            />
          </div>

          {/* Form */}
          <div className="lg:sticky lg:top-[90px] self-start rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-white/[0.07] dark:bg-white/[0.04]">
            <JobForm onSuccess={refreshDashboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userhome;
