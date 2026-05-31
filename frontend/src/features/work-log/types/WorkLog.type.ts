export interface WorkEntry {
  id: number;
  date: string;
  work_type: string;
  volume: string;
  unit: string;
  performer: string;
  created_at: string;
}

export interface WorkType {
  id: number;
  name: string;
}

export interface EntryFormData {
  date: string;
  workType: string;
  volume: string;
  unit: string;
  performer: string;
}

export const UNITS = ["m³", "m²", "t", "pcs", "m", "kg"] as const;
