import { WorkEntryRepository } from "../repositories/WorkEntry.repository";
import { WorkEntry } from "../entities/WorkEntry.entity";
import { WorkEntryFilters, CreateWorkEntryDto } from "../types/WorkEntry.type";

export class WorkEntryService {
  constructor(private readonly repo: WorkEntryRepository) {}

  async getAll(filters: WorkEntryFilters): Promise<WorkEntry[]> {
    return this.repo.findAll(filters);
  }

  async create(data: CreateWorkEntryDto): Promise<WorkEntry> {
    const entry = this.repo.create({
      date: data.date,
      work_type: data.workType.trim(),
      volume: String(data.volume),
      unit: data.unit,
      performer: data.performer.trim(),
    });
    return this.repo.save(entry);
  }

  async update(id: number, data: CreateWorkEntryDto): Promise<WorkEntry> {
    const entry = await this.repo.findById(id);
    if (!entry) throw new Error("NOT_FOUND");

    entry.date = data.date;
    entry.work_type = data.workType.trim();
    entry.volume = String(data.volume);
    entry.unit = data.unit;
    entry.performer = data.performer.trim();

    return this.repo.save(entry);
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error("NOT_FOUND");
  }
}
