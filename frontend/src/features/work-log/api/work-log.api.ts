import httpClient from "../../../api/http.client";
import type { WorkEntry, WorkType, EntryFormData } from "../types/WorkLog.type";

export const getWorkEntries = async (params?: {
  from?: string;
  to?: string;
  sort?: "asc" | "desc";
}): Promise<WorkEntry[]> => {
  const { data } = await httpClient.get<WorkEntry[]>("/work-entries", { params });
  return data;
};

export const createWorkEntry = async (payload: EntryFormData): Promise<WorkEntry> => {
  const { data } = await httpClient.post<WorkEntry>("/work-entries", {
    date: payload.date,
    workType: payload.workType,
    volume: parseFloat(payload.volume),
    unit: payload.unit,
    performer: payload.performer,
  });
  return data;
};

export const updateWorkEntry = async (
  id: number,
  payload: EntryFormData,
): Promise<WorkEntry> => {
  const { data } = await httpClient.put<WorkEntry>(`/work-entries/${id}`, {
    date: payload.date,
    workType: payload.workType,
    volume: parseFloat(payload.volume),
    unit: payload.unit,
    performer: payload.performer,
  });
  return data;
};

export const deleteWorkEntry = async (id: number): Promise<void> => {
  await httpClient.delete(`/work-entries/${id}`);
};

export const getWorkTypes = async (): Promise<WorkType[]> => {
  const { data } = await httpClient.get<WorkType[]>("/work-types");
  return data;
};
