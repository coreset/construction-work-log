import React from "react";

interface FilterBarProps {
  from: string;
  to: string;
  sort: "asc" | "desc";
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  onSortChange: (v: "asc" | "desc") => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  from, to, sort,
  onFromChange, onToChange, onSortChange, onReset,
}) => (
  <div className="flex flex-wrap items-end gap-4">
    <div className="flex flex-col gap-1">
      <label className="form-label">From</label>
      <input
        type="date"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        className="ant-input"
        style={{ width: "160px" }}
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="form-label">To</label>
      <input
        type="date"
        value={to}
        onChange={(e) => onToChange(e.target.value)}
        className="ant-input"
        style={{ width: "160px" }}
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="form-label">Sort</label>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        className="ant-input"
        style={{ width: "152px" }}
      >
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>
    </div>

    <button onClick={onReset} className="btn-text btn-sm self-end mb-[1px]">
      Reset filters
    </button>
  </div>
);

export default FilterBar;
