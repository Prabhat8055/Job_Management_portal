import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
//all in components
import Box1 from "@/components/Box1";
import JobForm from "@/components/JobForm";
import List2 from "@/components/List2";
import Table3 from "@/components/Table3";

import {
  getData,
  deleteSelectedData,
  getDashboardStatus,
} from "@/services/FormService";

import { Typography, Grid, Divider, Box, Container } from "@mui/material";
import useAuth from "@/auth/store";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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
  // Table rows
  const [rows, setRows] = useState<JobApplication[]>([]);

  // Selected row id
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Dashboard stats
  const [stats, setStats] = useState<DashboardStatus>({});

  // Refresh state
  const [refreshKey, setRefreshKey] = useState<number>(0);
  /* ------------------------------------------------------------------------ */
  /*                                FETCH DATA                                */
  /* ------------------------------------------------------------------------ */

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      const data: ApiJobData[] = await getData();

      const formattedRows: JobApplication[] = data.map((item) => ({
        id: item.id,
        company: item.companyName,
        role: item.role,
        type: item.jobType,
        source: item.source,
        date: new Date(item.appliedDate).toLocaleDateString(),
        status: item.status,
        notes: item.notes,
      }));

      setRows(formattedRows);
    } catch (error) {
      console.error("Error Fetching Table data", error);
    }
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                              FETCH STATS                                 */
  /* ------------------------------------------------------------------------ */

  const fetchStats = async (): Promise<void> => {
    try {
      const data: DashboardStatus = await getDashboardStatus();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats", error);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                              DELETE HANDLER                              */
  /* ------------------------------------------------------------------------ */

  const handleDelete = async (id: number | null): Promise<void> => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmDelete) return;

    try {
      await deleteSelectedData(id);

      refreshDashboard();
      setSelectedId(null);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete data");
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                             REFRESH DASHBOARD                            */
  /* ------------------------------------------------------------------------ */

  const refreshDashboard = (): void => {
    setRefreshKey((prev) => prev + 1);
  };

  /* ------------------------------------------------------------------------ */
  /*                                USE EFFECT                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [refreshKey, fetchData]);

  /* ------------------------------------------------------------------------ */
  /*                                 PARAMS                                   */
  /* ------------------------------------------------------------------------ */

  const username = useAuth((state) => state.user?.name);

  console.log(username);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: document.documentElement.classList.contains("dark")
          ? "linear-gradient(to bottom right, #060816, #0B0F19, #111827)"
          : "linear-gradient(to bottom right, #f1f5f9, #ffffff, #e2e8f0)",

        pt: "110px",
        pb: 4,
        px: { xs: 2, md: 4 },
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        {/* TOP SECTION */}
        <Box sx={{ mb: 3 }}>
          <Box1 stats={stats} />
        </Box>

        {/* QUICK FILTERS / LIST */}
        <Box sx={{ mb: 3 }}>
          <List2 />
        </Box>

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          {/* TITLE */}
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: document.documentElement.classList.contains("dark")
                ? "white"
                : "black",
            }}
          >
            My Applications
          </Typography>

          {/* ACTION BUTTONS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* DELETE */}
            <Box
              component="button"
              disabled={!selectedId}
              onClick={() => handleDelete(selectedId)}
              sx={{
                px: 2,
                py: 1,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: document.documentElement.classList.contains(
                  "dark",
                )
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
                color: selectedId ? "#ef4444" : "text.disabled",
                cursor: selectedId ? "pointer" : "not-allowed",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor:
                    selectedId &&
                    document.documentElement.classList.contains("dark")
                      ? "rgba(239,68,68,0.12)"
                      : selectedId
                        ? "rgba(239,68,68,0.08)"
                        : undefined,
                },
              }}
            >
              Delete
            </Box>

            {/* EDIT */}
            <Box
              component="button"
              disabled={!selectedId}
              onClick={() => handleDelete(selectedId)}
              sx={{
                px: 2,
                py: 1,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: document.documentElement.classList.contains(
                  "dark",
                )
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
                color: selectedId ? "#22c55e" : "text.disabled",
                cursor: selectedId ? "pointer" : "not-allowed",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor:
                    selectedId &&
                    document.documentElement.classList.contains("dark")
                      ? "rgba(34,197,94,0.12)"
                      : selectedId
                        ? "rgba(34,197,94,0.08)"
                        : undefined,
                },
              }}
            >
              Edit
            </Box>
          </Box>
        </Box>

        <Divider
          sx={{
            mb: 3,
            borderColor: document.documentElement.classList.contains("dark")
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
          }}
        />

        {/* MAIN CONTENT */}
        <Grid container spacing={4}>
          {/* TABLE */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box
              sx={{
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: document.documentElement.classList.contains("dark")
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
                background: document.documentElement.classList.contains("dark")
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                boxShadow: document.documentElement.classList.contains("dark")
                  ? "0 8px 30px rgba(0,0,0,0.35)"
                  : "0 8px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Table3
                rows={rows}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                onDeleteSuccess={refreshDashboard}
              />
            </Box>
          </Grid>

          {/* FORM */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box
              sx={{
                position: { lg: "sticky" },
                top: 110, // FIX FOR FLOATING NAVBAR
                borderRadius: "24px",
                border: "1px solid",
                borderColor: document.documentElement.classList.contains("dark")
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
                background: document.documentElement.classList.contains("dark")
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                boxShadow: document.documentElement.classList.contains("dark")
                  ? "0 8px 30px rgba(0,0,0,0.35)"
                  : "0 8px 30px rgba(0,0,0,0.08)",
                p: 2,
              }}
            >
              <JobForm onSuccess={refreshDashboard} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Userhome;
