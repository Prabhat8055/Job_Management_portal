import apiClient from "@/config/ApiClient";

export interface JobFormData {
  companyName: string;
  role: string;
  jobType: string;
  source: string;
  appliedDate: string;
  status: string;
  notes: string;
}
export interface JobFormProps {
  onSuccess: () => void;
}
export interface JobApplication extends JobFormData {
  id: number;
}

export interface DashboardStatus {
  total: number;
  applied: number;
  interviewing: number;
  offers: number;
  rejected: number;
  [key: string]: number;
}

/* -------------------------------------------------------------------------- */
/*                                POST DATA                                   */
/* -------------------------------------------------------------------------- */

export const postData = async (data: JobFormData): Promise<JobApplication> => {
  const response = await apiClient.post<JobApplication>("jobs/add-data", data);

  return response.data;
};

/* -------------------------------------------------------------------------- */
/*                                 GET DATA                                   */
/* -------------------------------------------------------------------------- */

export const getData = async (): Promise<JobApplication[]> => {
  const response = await apiClient.get<JobApplication[]>("jobs/get-data");

  return response.data;
};

/* -------------------------------------------------------------------------- */
/*                               DELETE DATA                                  */
/* -------------------------------------------------------------------------- */

export const deleteSelectedData = async (id: number): Promise<void> => {
  await apiClient.delete(`jobs/delete-data/${id}`);
};

/* -------------------------------------------------------------------------- */
/*                            DASHBOARD STATS                                 */
/* -------------------------------------------------------------------------- */

export const getDashboardStatus = async (): Promise<DashboardStatus> => {
  const response = await apiClient.get<DashboardStatus>("jobs/dashboard-stats");

  return response.data;
};
