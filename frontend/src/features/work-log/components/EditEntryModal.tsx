import React, { useState, useEffect } from "react";
import type { WorkEntry, EntryFormData, WorkType } from "../types/WorkLog.type";
import { UNITS } from "../types/WorkLog.type";

interface EditEntryModalProps {
  entry: WorkEntry;
  workTypes: WorkType[];
  onClose: () => void;
  onSubmit: (data: EntryFormData) => Promise<void>;
}

const today = () => new Date().toISOString().split("T")[0];

const Field = ({
  label, error, children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="form-label">{label}</label>
    {children}
    {error && <p className="form-error">{error}</p>}
  </div>
);

const EditEntryModal: React.FC<EditEntryModalProps> = ({
  entry, workTypes, onClose, onSubmit,
}) => {
  const [form, setForm] = useState<EntryFormData>({
    date: entry.date,
    workType: entry.work_type,
    volume: entry.volume,
    unit: entry.unit,
    performer: entry.performer,
  });
  const [errors, setErrors] = useState<Partial<EntryFormData>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (): boolean => {
    const errs: Partial<EntryFormData> = {};
    if (!form.date) errs.date = "Date is required";
    else if (form.date > today()) errs.date = "Date cannot be in the future";
    if (!form.workType || form.workType.trim().length < 2)
      errs.workType = "Min 2 characters";
    const vol = parseFloat(form.volume);
    if (!form.volume || isNaN(vol) || vol <= 0) errs.volume = "Must be a positive number";
    if (!form.unit) errs.unit = "Unit is required";
    if (!form.performer || form.performer.trim().length < 3)
      errs.performer = "Min 3 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit(form); onClose(); }
    finally { setLoading(false); }
  };

  const cls = (key: keyof EntryFormData) =>
    `ant-input${errors[key] ? " is-error" : ""}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "var(--color-overlay)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full mx-4 flex flex-col"
        style={{
          maxWidth: "480px",
          backgroundColor: "var(--color-bg-component)",
          borderRadius: "8px",
          boxShadow: "var(--shadow-modal)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid var(--color-divider)" }}
        >
          <h4
            className="font-medium"
            style={{ fontSize: "16px", color: "var(--color-text-heading)" }}
          >
            Edit Entry #{entry.id}
          </h4>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ fontSize: "20px" }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <Field label="Date" error={errors.date}>
            <input
              type="date" value={form.date} max={today()}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={cls("date")}
            />
          </Field>

          <Field label="Type of Work" error={errors.workType}>
            <select
              value={form.workType}
              onChange={(e) => setForm({ ...form, workType: e.target.value })}
              className={cls("workType")}
            >
              <option value="">— select —</option>
              {workTypes.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </Field>

          <div className="flex gap-3">
            <div className="flex-1">
              <Field label="Volume" error={errors.volume}>
                <input
                  type="number" min="0.01" step="0.01"
                  value={form.volume}
                  onChange={(e) => setForm({ ...form, volume: e.target.value })}
                  className={cls("volume")}
                />
              </Field>
            </div>
            <div style={{ width: "112px" }}>
              <Field label="Unit" error={errors.unit}>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className={cls("unit")}
                >
                  {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </Field>
            </div>
          </div>

          <Field label="Performer" error={errors.performer}>
            <input
              type="text" value={form.performer}
              onChange={(e) => setForm({ ...form, performer: e.target.value })}
              className={cls("performer")}
            />
          </Field>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end gap-2 px-4 py-3"
          style={{ borderTop: "1px solid var(--color-divider)" }}
        >
          <button onClick={onClose} className="btn-default">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="btn-primary">
            {loading ? "Saving…" : "Update Entry"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEntryModal;
