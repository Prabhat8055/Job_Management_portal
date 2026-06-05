import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  PlusCircle,
  Building2,
  Briefcase,
  Calendar,
  FileText,
} from "lucide-react";
import {
  postData,
  type JobFormData,
  type JobFormProps,
} from "@/services/FormService";
import toast from "react-hot-toast";

const initialState: JobFormData = {
  companyName: "",
  role: "",
  jobType: "",
  source: "",
  appliedDate: "",
  status: "",
  notes: "",
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400";
const labelCls =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400";

const JobForm: React.FC<JobFormProps> = ({ onSuccess }) => {
  const [data, setData] = useState<JobFormData>(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.companyName.trim() || !data.role.trim()) {
      toast.error("Company name and role are required");
      return;
    }
    try {
      setLoading(true);
      await postData(data);
      toast.success("Application added!");
      onSuccess();
      setData(initialState);
    } catch {
      toast.error("Failed to add application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10">
          <PlusCircle size={16} className="text-cyan-600 dark:text-cyan-400" />
        </div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Add Application
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Company */}
        <div>
          <label className={labelCls}>Company Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              placeholder="e.g. Google"
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className={labelCls}>Job Role</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="role"
              value={data.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>

        {/* Type + Source row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Job Type</label>
            <select
              name="jobType"
              value={data.jobType}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select…</option>
              <option value="Full-time">Full-time</option>
              <option value="Intern">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Source</label>
            <select
              name="source"
              value={data.source}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select…</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Naukri">Naukri</option>
              <option value="Company Site">Company Site</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Date + Status row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Date Applied</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                name="appliedDate"
                value={data.appliedDate}
                onChange={handleChange}
                className={`${inputCls} pl-9`}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select
              name="status"
              value={data.status}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select…</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className={labelCls}>Notes</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <textarea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              rows={3}
              placeholder="HR contact, job link, or any notes…"
              className={`${inputCls} resize-none pl-9`}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 text-sm font-bold text-black shadow-md shadow-cyan-400/20 transition-all hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 disabled:opacity-60"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
          ) : (
            <>
              <PlusCircle size={16} /> Add Application
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
