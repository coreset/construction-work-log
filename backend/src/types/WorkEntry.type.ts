export interface WorkEntryFilters {
  from?: string;
  to?: string;
  sort?: "asc" | "desc";
}

export type { CreateWorkEntryDto } from "../validators/WorkEntry.validation";
