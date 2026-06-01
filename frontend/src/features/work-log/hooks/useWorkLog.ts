import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getWorkEntries,
  createWorkEntry,
  updateWorkEntry,
  deleteWorkEntry,
  getWorkTypes,
} from "../api/work-log.api";
import type { WorkEntry, WorkType, EntryFormData } from "../types/WorkLog.type";

export function useWorkLog() {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editEntry, setEditEntry] = useState<WorkEntry | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getWorkEntries({
        from: from || undefined,
        to: to || undefined,
        sort,
      });
      setEntries(data);
    } catch {
      toast.error("Failed to load entries");
    } finally {
      setLoading(false);
    }
  }, [from, to, sort]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    getWorkTypes()
      .then(setWorkTypes)
      .catch(() => toast.error("Failed to load work types"));
  }, []);

  const handleAdd = async (data: EntryFormData) => {
    await createWorkEntry(data);
    toast.success("Entry added successfully");
    fetchEntries();
  };

  const handleEdit = async (data: EntryFormData) => {
    if (!editEntry) return;
    await updateWorkEntry(editEntry.id, data);
    toast.success("Entry updated");
    fetchEntries();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await deleteWorkEntry(id);
      toast.success("Entry deleted");
      fetchEntries();
    } catch {
      toast.error("Failed to delete entry");
    }
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    setSort("desc");
  };

  return {
    entries,
    workTypes,
    loading,
    showAdd,
    setShowAdd,
    editEntry,
    setEditEntry,
    from,
    setFrom,
    to,
    setTo,
    sort,
    setSort,
    handleAdd,
    handleEdit,
    handleDelete,
    handleReset,
  };
}
