import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

import {
  Edit,
  Trash2,
  Mail,
  CalendarDays,
  ShieldCheck,
  Save,
  X,
} from "lucide-react";

import useAuth from "@/auth/store";

const Userprofile = () => {
  const isDark = document.documentElement.classList.contains("dark");

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [loading, setLoading] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  /* ------------------------------------------------------------------------ */
  /*                               FETCH USER                                 */
  /* ------------------------------------------------------------------------ */

  const user = useAuth((state) => state.user);

  /* ------------------------------------------------------------------------ */
  /*                               UPDATE USER                                */
  /* ------------------------------------------------------------------------ */

  // const handleUpdate = async (): Promise<void> => {
  //   try {
  //     const response = await axios.put<User>(
  //       "http://localhost:8083/api/v1/user/update",
  //       formData,
  //       {
  //         withCredentials: true,
  //       },
  //     );

  //     setUser(response.data);

  //     setIsEditing(false);

  //     alert("Profile updated successfully");
  //   } catch (error) {
  //     console.error("Update error:", error);
  //     alert("Failed to update profile");
  //   }
  // };

  /* ------------------------------------------------------------------------ */
  /*                               DELETE USER                                */
  /* ------------------------------------------------------------------------ */

  // const handleDelete = async (): Promise<void> => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete your account?",
  //   );

  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete("http://localhost:8083/api/v1/user/delete", {
  //       withCredentials: true,
  //     });

  //     alert("Account deleted successfully");

  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //     alert("Failed to delete account");
  //   }
  // };

  /* ------------------------------------------------------------------------ */
  /*                                  LOADING                                 */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: isDark
            ? "linear-gradient(to bottom right, #060816, #0B0F19, #111827)"
            : "linear-gradient(to bottom right, #f1f5f9, #ffffff, #e2e8f0)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                   UI                                     */
  /* ------------------------------------------------------------------------ */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: "110px", // NAVBAR SPACE
        pb: 4,
        px: 2,
        background: isDark
          ? "linear-gradient(to bottom right, #060816, #0B0F19, #111827)"
          : "linear-gradient(to bottom right, #f1f5f9, #ffffff, #e2e8f0)",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="md">
        {/* MAIN CARD */}
        <Box
          sx={{
            borderRadius: "28px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            background: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 8px 30px rgba(0,0,0,0.35)"
              : "0 8px 30px rgba(0,0,0,0.08)",
            p: { xs: 3, md: 5 },
          }}
        >
          {/* ---------------------------------------------------------------- */}
          {/* TOP SECTION */}
          {/* ---------------------------------------------------------------- */}

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 4,
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            {/* AVATAR */}

            <Avatar
              src={user?.image}
              sx={{
                width: 120,
                height: 120,
                fontSize: "42px",
                fontWeight: 700,
                background: "#06b6d4",
                color: "#000",
                boxShadow: "0 10px 25px rgba(6,182,212,0.35)",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>

            {/* USER DETAILS */}

            <Box sx={{ flex: 1, width: "100%" }}>
              {!isEditing ? (
                <>
                  {/* NAME */}

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: isDark ? "#fff" : "#111827",
                      textAlign: {
                        xs: "center",
                        md: "left",
                      },
                    }}
                  >
                    {user?.name || "Unnamed User"}
                  </Typography>

                  {/* EMAIL */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                      justifyContent: {
                        xs: "center",
                        md: "flex-start",
                      },
                    }}
                  >
                    <Mail size={16} />

                    <Typography
                      sx={{
                        color: isDark ? "#9CA3AF" : "#4B5563",
                      }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>

                  {/* CHIPS */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      mt: 3,
                      justifyContent: {
                        xs: "center",
                        md: "flex-start",
                      },
                    }}
                  >
                    <Chip
                      icon={<ShieldCheck size={16} />}
                      label={user?.enable ? "Verified" : "Not Verified"}
                      color={user?.enable ? "success" : "warning"}
                    />

                    <Chip
                      label={`Provider: ${user?.provider}`}
                      sx={{
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.06)",
                        color: isDark ? "#fff" : "#111827",
                      }}
                    />
                  </Box>
                </>
              ) : (
                <>
                  {/* EDIT FORM */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="Full Name"
                      value={formData.name}
                      fullWidth
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />

                    <TextField
                      label="Email"
                      value={formData.email}
                      fullWidth
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* ---------------------------------------------------------------- */}
          {/* DIVIDER */}
          {/* ---------------------------------------------------------------- */}

          <Divider
            sx={{
              my: 4,
              borderColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            }}
          />

          {/* ---------------------------------------------------------------- */}
          {/* USER INFO */}
          {/* ---------------------------------------------------------------- */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* CREATED */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CalendarDays size={18} />

              <Typography>
                Joined:{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Box>

            {/* UPDATED */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CalendarDays size={18} />

              <Typography>
                Updated:{" "}
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* ---------------------------------------------------------------- */}
          {/* DIVIDER */}
          {/* ---------------------------------------------------------------- */}

          <Divider
            sx={{
              my: 4,
              borderColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            }}
          />

          {/* ---------------------------------------------------------------- */}
          {/* ACTION BUTTONS */}
          {/* ---------------------------------------------------------------- */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            {!isEditing ? (
              <>
                {/* EDIT */}

                <Button
                  startIcon={<Edit size={18} />}
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    borderRadius: "14px",
                    background: "#06b6d4",
                    color: "#000",
                    fontWeight: 700,
                    py: 1.2,
                    px: 3,
                    textTransform: "none",
                    "&:hover": {
                      background: "#22d3ee",
                    },
                  }}
                >
                  Edit Profile
                </Button>

                {/* DELETE */}

                <Button
                  startIcon={<Trash2 size={18} />}
                  variant="outlined"
                  color="error"
                  // onClick={handleDelete}
                  sx={{
                    borderRadius: "14px",
                    py: 1.2,
                    px: 3,
                    textTransform: "none",
                  }}
                >
                  Delete Account
                </Button>
              </>
            ) : (
              <>
                {/* SAVE */}

                <Button
                  startIcon={<Save size={18} />}
                  variant="contained"
                  // onClick={handleUpdate}
                  sx={{
                    borderRadius: "14px",
                    background: "#06b6d4",
                    color: "#000",
                    fontWeight: 700,
                    py: 1.2,
                    px: 3,
                    textTransform: "none",
                    "&:hover": {
                      background: "#22d3ee",
                    },
                  }}
                >
                  Save Changes
                </Button>

                {/* CANCEL */}

                <Button
                  startIcon={<X size={18} />}
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  sx={{
                    borderRadius: "14px",
                    py: 1.2,
                    px: 3,
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Userprofile;
