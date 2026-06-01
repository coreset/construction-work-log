import Header from "../components/layout/Header";
import FilterBar from "../features/work-log/components/FilterBar";
import WorkLogTable from "../features/work-log/components/WorkLogTable";
import AddEntryModal from "../features/work-log/components/AddEntryModal";
import EditEntryModal from "../features/work-log/components/EditEntryModal";
import { useWorkLog } from "../features/work-log/hooks/useWorkLog";

export default function WorkLogPage() {
  const {
    entries, workTypes, loading,
    showAdd, setShowAdd,
    editEntry, setEditEntry,
    from, setFrom, to, setTo, sort, setSort,
    handleAdd, handleEdit, handleDelete, handleReset,
  } = useWorkLog();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-page)" }}>
      <Header onAddEntry={() => setShowAdd(true)} />

      <main className="max-w-content mx-auto px-6 py-6 space-y-4">
        {/* Filter card */}
        <div className="ant-card !p-4">
          <FilterBar
            from={from} to={to} sort={sort}
            onFromChange={setFrom} onToChange={setTo}
            onSortChange={setSort} onReset={handleReset}
          />
        </div>

        {/* Result count */}
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          {loading
            ? "Loading…"
            : `${entries.length} entr${entries.length === 1 ? "y" : "ies"}`}
        </p>

        {/* Table card */}
        <div className="ant-card !p-0 overflow-hidden">
          {loading ? (
            <div
              className="py-16 text-center text-sm"
              style={{ color: "var(--color-text-disabled)" }}
            >
              Loading entries…
            </div>
          ) : (
            <WorkLogTable
              entries={entries}
              onEdit={setEditEntry}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>

      {showAdd && (
        <AddEntryModal
          workTypes={workTypes}
          onClose={() => setShowAdd(false)}
          onSubmit={handleAdd}
        />
      )}
      {editEntry && (
        <EditEntryModal
          entry={editEntry}
          workTypes={workTypes}
          onClose={() => setEditEntry(null)}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
}
