import React from "react";
import type { WorkEntry } from "../types/WorkLog.type";
import { formatDate } from "../../../utils/formatDate.util";

interface WorkLogTableProps {
  entries: WorkEntry[];
  onEdit: (entry: WorkEntry) => void;
  onDelete: (id: number) => void;
}

const COL_HEADERS = ["Date", "Type of Work", "Volume", "Unit", "Performer", ""];

const WorkLogTable: React.FC<WorkLogTableProps> = ({ entries, onEdit, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          No entries found.
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-disabled)" }}>
          Add your first work log entry to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr
            style={{
              backgroundColor: "var(--color-bg-table-header)",
              borderBottom: "1px solid var(--color-divider)",
            }}
          >
            {COL_HEADERS.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-medium"
                style={{ color: "var(--color-text-heading)", fontSize: "14px" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.id}
              style={{ borderBottom: "1px solid var(--color-divider)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "")
              }
            >
              <td className="px-4 py-3 font-mono" style={{ color: "var(--color-text-heading)" }}>
                {formatDate(entry.date)}
              </td>
              <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-heading)" }}>
                {entry.work_type}
              </td>
              <td className="px-4 py-3 text-right font-mono" style={{ color: "var(--color-text-heading)" }}>
                {parseFloat(entry.volume).toLocaleString()}
              </td>
              <td className="px-4 py-3" style={{ color: "var(--color-text-secondary)" }}>
                {entry.unit}
              </td>
              <td className="px-4 py-3" style={{ color: "var(--color-text-heading)" }}>
                {entry.performer}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-end">
                  <button onClick={() => onEdit(entry)} className="btn-default btn-sm">
                    Edit
                  </button>
                  <button onClick={() => onDelete(entry.id)} className="btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkLogTable;
