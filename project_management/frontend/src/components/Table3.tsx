import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { TableVirtuoso } from "react-virtuoso";

import type { TableComponents } from "react-virtuoso";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface RowData {
  id: number;
  company: string;
  role: string;
  type: string;
  source: string;
  date: string;
  status: string;
  notes: string;
}

interface Column {
  width: number;
  label: string;
  dataKey: keyof RowData;
}

interface Table3Props {
  rows: RowData[];
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  onDeleteSuccess: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                  COLUMNS                                   */
/* -------------------------------------------------------------------------- */

const columns: Column[] = [
  { width: 140, label: "Company Name", dataKey: "company" },
  { width: 150, label: "Job Role", dataKey: "role" },
  { width: 100, label: "Job Type", dataKey: "type" },
  { width: 130, label: "Source", dataKey: "source" },
  { width: 120, label: "Date Applied", dataKey: "date" },
  { width: 130, label: "Current Status", dataKey: "status" },
  { width: 150, label: "Notes", dataKey: "notes" },
];

/* -------------------------------------------------------------------------- */
/*                          VIRTUAL TABLE COMPONENTS                          */
/* -------------------------------------------------------------------------- */

const VirtuosoTableComponents: TableComponents<RowData> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),

  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
      }}
    />
  ),

  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),

  TableRow: (props) => (
    <TableRow
      {...props}
      sx={{
        "&:hover": {
          backgroundColor: "#F8FAFC",
        },
      }}
    />
  ),

  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

/* -------------------------------------------------------------------------- */
/*                              HEADER CONTENT                                */
/* -------------------------------------------------------------------------- */

function fixedHeaderContent(): React.ReactNode {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          style={{
            width: column.width,
          }}
          sx={{
            backgroundColor: "#F1F5F9",
            color: "#475569",
            fontSize: "13px",
            fontWeight: 600,
            borderBottom: "1px solid #E6EAF2",
            py: "12px",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

/* -------------------------------------------------------------------------- */
/*                                ROW CONTENT                                 */
/* -------------------------------------------------------------------------- */

function rowContent(
  _index: number,
  row: RowData,
  selectedId: number | null,
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>,
): React.ReactNode {
  const isSelected = selectedId === row.id;

  return (
    <>
      {columns.map((column) => {
        const isNotes = column.dataKey === "notes";

        return (
          <TableCell
            key={column.dataKey}
            onClick={() => setSelectedId(row.id)}
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#1F2937",
              borderBottom: "1px solid #E6EAF2",
              padding: "10px",

              backgroundColor: isSelected ? "#E0F2FE" : "inherit",

              overflow: "hidden",

              textOverflow: isNotes ? "clip" : "ellipsis",

              wordBreak: "break-word",

              maxWidth: "100%",
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        );
      })}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const Table3: React.FC<Table3Props> = ({ rows, selectedId, setSelectedId }) => {
  return (
    <Paper
      sx={{
        height: { xs: 400, md: 600 },

        borderRadius: "12px",

        overflowX: "hidden",

        backgroundColor: "#FFFFFF",

        border: "1px solid #E6EAF2",

        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",

        fontFamily: "Inter, sans-serif",
      }}
    >
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(index, row) =>
          rowContent(index, row, selectedId, setSelectedId)
        }
      />
    </Paper>
  );
};

export default Table3;
