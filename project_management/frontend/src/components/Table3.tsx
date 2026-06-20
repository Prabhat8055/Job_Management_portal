import React from "react";
import { TableVirtuoso } from "react-virtuoso";
import type { TableComponents } from "react-virtuoso";

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

interface Table3Props {
  rows: RowData[];
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  onDeleteSuccess: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  Interview: "bg-cyan-400/15 text-cyan-700 dark:text-cyan-300",
  Applied: "bg-blue-400/15 text-blue-700 dark:text-blue-300",
  Shortlisted: "bg-indigo-400/15 text-indigo-700 dark:text-indigo-300",
  Offer: "bg-green-400/15 text-green-700 dark:text-green-300",
  Rejected: "bg-red-400/15 text-red-600 dark:text-red-400",
};

const columns = [
  { label: "Company", key: "company" as keyof RowData, width: "18%" },
  { label: "Role", key: "role" as keyof RowData, width: "18%" },
  { label: "Type", key: "type" as keyof RowData, width: "10%" },
  { label: "Source", key: "source" as keyof RowData, width: "12%" },
  { label: "Date", key: "date" as keyof RowData, width: "12%" },
  { label: "Status", key: "status" as keyof RowData, width: "13%" },
  { label: "Notes", key: "notes" as keyof RowData, width: "17%" },
];

const VirtuosoComponents: TableComponents<RowData> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <div {...props} ref={ref} className="overflow-auto" />
  )),
  Table: (props) => (
    <table
      {...props}
      style={{
        borderCollapse: "separate",
        borderSpacing: 0,
        width: "100%",
        tableLayout: "fixed",
      }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <thead {...props} ref={ref} />
  )),
  TableRow: (props) => <tr {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <tbody {...props} ref={ref} />
  )),
};

const Table3: React.FC<Table3Props> = ({ rows, selectedId, setSelectedId }) => {
  return (
    <div className="flex h-125 flex-col overflow-hidden rounded-2xl md:h-150">
      <TableVirtuoso
        data={rows}
        components={VirtuosoComponents}
        fixedHeaderContent={() => (
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className="border-b border-slate-100 bg-slate-50/90 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500 backdrop-blur dark:border-white/8 dark:bg-[#0a0f1a]/90 dark:text-slate-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        )}
        itemContent={(_index, row) => {
          const isSelected = selectedId === row.id;
          return (
            <>
              {columns.map((col) => (
                <td
                  key={col.key}
                  onClick={() => setSelectedId(isSelected ? null : row.id)}
                  className={`cursor-pointer border-b px-4 py-3 text-sm transition-colors ${
                    isSelected
                      ? "border-cyan-100 bg-cyan-50/80 dark:border-cyan-500/10 dark:bg-cyan-500/5"
                      : "border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/3"
                  }`}
                >
                  {col.key === "status" ? (
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status] || "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"}`}
                    >
                      {row[col.key]}
                    </span>
                  ) : (
                    <span
                      className={`block overflow-hidden text-ellipsis whitespace-nowrap ${col.key === "company" ? "font-semibold text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
                    >
                      {row[col.key] || (
                        <span className="text-slate-300 dark:text-slate-600">
                          —
                        </span>
                      )}
                    </span>
                  )}
                </td>
              ))}
            </>
          );
        }}
      />
      {rows.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center">
          <span className="text-4xl">📭</span>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            No applications yet
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Add your first one using the form →
          </p>
        </div>
      )}
    </div>
  );
};

export default Table3;
