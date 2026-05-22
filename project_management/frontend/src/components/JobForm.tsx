import { useState } from "react";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// import { postData } from "../services/postData";

import type { ChangeEvent, FormEvent } from "react";

import type { JobFormData, JobFormProps } from "@/services/FormService";
/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

// interface JobFormData {
//   companyName: string;
//   role: string;
//   jobType: string;
//   source: string;
//   appliedDate: string;
//   status: string;
//   notes: string;
// }

// interface JobFormProps {
//   onSuccess: () => void;
// }

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const JobForm: React.FC<JobFormProps> = ({ onSuccess }) => {
  /* ------------------------------------------------------------------------ */
  /*                              INITIAL STATE                               */
  /* ------------------------------------------------------------------------ */

  const initialState: JobFormData = {
    companyName: "",
    role: "",
    jobType: "",
    source: "",
    appliedDate: "",
    status: "",
    notes: "",
  };

  const [data, setData] = useState<JobFormData>(initialState);

  /* ------------------------------------------------------------------------ */
  /*                              HANDLE CHANGE                               */
  /* ------------------------------------------------------------------------ */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ------------------------------------------------------------------------ */
  /*                              HANDLE SUBMIT                               */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      //   const resp = await postData(data);

      //   console.log("response successful", resp);

      onSuccess();

      // Reset form
      setData(initialState);
    } catch (error) {
      console.error(error);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                                   JSX                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <Paper
      sx={{
        width: 400,
        p: 2.5,
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E6EAF2",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#1F2937",
          mb: 2,
        }}
      >
        Add Application
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* COMPANY NAME */}
          <TextField
            label="Company Name"
            name="companyName"
            fullWidth
            value={data.companyName}
            onChange={handleChange}
          />

          {/* ROLE */}
          <TextField
            label="Job Role"
            name="role"
            fullWidth
            value={data.role}
            onChange={handleChange}
          />

          {/* JOB TYPE */}
          <TextField
            select
            label="Job Type"
            name="jobType"
            fullWidth
            value={data.jobType}
            onChange={handleChange}
          >
            <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>

          {/* SOURCE */}
          <TextField
            select
            label="Source"
            name="source"
            fullWidth
            value={data.source}
            onChange={handleChange}
          >
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Naukri">Naukri</MenuItem>
            <MenuItem value="Company Site">Company Site</MenuItem>
            <MenuItem value="Referral">Referral</MenuItem>
          </TextField>

          {/* DATE */}
          <TextField
            label="Date Applied"
            type="date"
            name="appliedDate"
            value={data.appliedDate}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 40,
              },
            }}
          />

          {/* STATUS */}
          <TextField
            select
            label="Current Status"
            name="status"
            fullWidth
            value={data.status}
            onChange={handleChange}
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Shortlisted">Shortlisted</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>

          {/* NOTES */}
          <TextField
            label="Notes (HR name, link, comments)"
            name="notes"
            multiline
            rows={3}
            fullWidth
            value={data.notes}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
              },
            }}
          />

          {/* BUTTON */}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              height: 40,
              backgroundColor: "#2F6FED",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",

              "&:hover": {
                backgroundColor: "#1E5BD8",
              },
            }}
          >
            Add Application
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default JobForm;
